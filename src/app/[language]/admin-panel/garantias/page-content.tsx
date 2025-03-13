"use client";

import { RoleEnum } from "@/services/api/types/role";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useTranslation } from "@/services/i18n/client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useGarantiaListQuery,
  garantiasQueryKeys,
} from "./queries/garantias-queries";
import { TableVirtuoso } from "react-virtuoso";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
//import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import TableComponents from "@/components/table/table-components";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Garantia } from "@/services/api/types/garantia";
// import { User } from "@/services/api/types/user";
import Link from "@/components/link";
import useAuth from "@/services/auth/use-auth";
import useConfirmDialog from "@/components/confirm-dialog/use-confirm-dialog";
import { useDeleteGarantiasService } from "@/services/api/services/garantia";
// import removeDuplicatesFromArrayObjects from "@/services/helpers/remove-duplicates-from-array-of-objects";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import GarantiaFilter from "./garantia-filter";
import { useRouter, useSearchParams } from "next/navigation";
import TableSortLabel from "@mui/material/TableSortLabel";
import { GarantiaFilterType, GarantiaSortType } from "./garantia-filter-types";
import { SortEnum } from "@/services/api/types/sort-type";
import dayjs from "dayjs";

type GarantiasKeys = keyof Garantia;

const TableCellLoadingContainer = styled(TableCell)(() => ({
  padding: 0,
}));

function daysToNow(date: string) {
  const start = dayjs(date);
  const days = dayjs().diff(start, "day");
  return days > 0 ? days + " dias" : "";
}

function TableSortCellWrapper(
  props: PropsWithChildren<{
    width?: number;
    orderBy: GarantiasKeys;
    order: SortEnum;
    column: GarantiasKeys;
    handleRequestSort: (
      event: React.MouseEvent<unknown>,
      property: GarantiasKeys
    ) => void;
  }>
) {
  return (
    <TableCell
      style={{ width: props.width }}
      sortDirection={props.orderBy === props.column ? props.order : false}
    >
      <TableSortLabel
        active={props.orderBy === props.column}
        direction={props.orderBy === props.column ? props.order : SortEnum.ASC}
        onClick={(event) => props.handleRequestSort(event, props.column)}
      >
        {props.children}
      </TableSortLabel>
    </TableCell>
  );
}

function Actions({ garantia }: { garantia: Garantia }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = useAuth().user;
  const [role] = user?.role ? [user.role] : [{ name: RoleEnum.USER }];
  const { confirmDialog } = useConfirmDialog();
  const fetchGarantiaDelete = useDeleteGarantiasService();
  const queryClient = useQueryClient();
  const anchorRef = useRef<HTMLDivElement>(null);

  const canDelete = garantia.status !== "created"; // user.id !== authUser?.id;
  const { t: tGarantias } = useTranslation("admin-panel-garantias");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleAction = (event: React.MouseEvent<unknown>) => {
    setOpen(false);
    const sAction = (event.target as HTMLElement).title.toLowerCase();
    router.push(`/admin-panel/garantias/${sAction}/${garantia.garantiaId}`);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleDelete = async () => {
    const isConfirmed = await confirmDialog({
      title: tGarantias("admin-panel-garantias:confirm.delete.title"),
      message: tGarantias("admin-panel-garantias:confirm.delete.message"),
    });

    if (isConfirmed) {
      setOpen(false);

      const searchParams = new URLSearchParams(window.location.search);
      const searchParamsFilter = searchParams.get("filter");
      const searchParamsSort = searchParams.get("sort");

      let filter: GarantiaFilterType | undefined = undefined;
      let sort: GarantiaSortType | undefined = {
        order: SortEnum.DESC,
        orderBy: "garantiaId",
      };

      if (searchParamsFilter) {
        filter = JSON.parse(searchParamsFilter);
      }

      if (searchParamsSort) {
        sort = JSON.parse(searchParamsSort);
      }

      const previousData = queryClient.getQueryData<
        InfiniteData<{ nextPage: number; data: Garantia[] }>
      >(garantiasQueryKeys.list().sub.by({ sort, filter }).key);

      await queryClient.cancelQueries({
        queryKey: garantiasQueryKeys.list().key,
      });

      const newData = {
        ...previousData,
        pages: previousData?.pages.map((page) => ({
          ...page,
          data: page?.data.filter(
            (item) => item.garantiaId !== garantia.garantiaId
          ),
        })),
      };

      queryClient.setQueryData(
        garantiasQueryKeys.list().sub.by({ sort, filter }).key,
        newData
      );

      await fetchGarantiaDelete({
        id: garantia.garantiaId,
      });
    }
  };

  const mainButton = (
    <Button
      size="small"
      variant="contained"
      LinkComponent={Link}
      href={`/admin-panel/garantias/assign/${garantia.garantiaId}`}
    >
      {tGarantias("admin-panel-garantias:actions.assign")}
    </Button>
  );

  return (
    <>
      {[!canDelete].every(Boolean) ? (
        mainButton
      ) : (
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
          size="small"
        >
          {mainButton}

          <Button
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
      )}
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {role.name === "ADMIN" && (
                    <>
                      <MenuItem onClick={handleAction} title="check">
                        {tGarantias("admin-panel-garantias:actions.check")}
                      </MenuItem>
                      <MenuItem onClick={handleAction} title="edit">
                        {tGarantias("admin-panel-garantias:actions.edit")}
                      </MenuItem>
                    </>
                  )}
                  {canDelete && role.name === "ADMIN" && (
                    <MenuItem onClick={handleDelete}>
                      {tGarantias("admin-panel-garantias:actions.delete")}
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

function Garantias() {
  const { t: tGarantias } = useTranslation("admin-panel-garantias");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [{ order, orderBy }, setSort] = useState<{
    order: SortEnum;
    orderBy: GarantiasKeys;
  }>(() => {
    const searchParamsSort = searchParams.get("sort");
    if (searchParamsSort) {
      return JSON.parse(searchParamsSort);
    }
    return { order: SortEnum.DESC, orderBy: "id" };
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: GarantiasKeys
  ) => {
    const isAsc = orderBy === property && order === SortEnum.ASC;
    const searchParams = new URLSearchParams(window.location.search);
    const newOrder = isAsc ? SortEnum.DESC : SortEnum.ASC;
    const newOrderBy = property;
    searchParams.set(
      "sort",
      JSON.stringify({ order: newOrder, orderBy: newOrderBy })
    );
    setSort({
      order: newOrder,
      orderBy: newOrderBy,
    });
    router.push(window.location.pathname + "?" + searchParams.toString());
  };

  const filter = useMemo(() => {
    const searchParamsFilter = searchParams.get("filter");
    if (searchParamsFilter) {
      return JSON.parse(searchParamsFilter) as GarantiaFilterType;
    }

    return undefined;
  }, [searchParams]);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGarantiaListQuery({ filter, sort: { order, orderBy } });
  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const result = useMemo(() => {
    const result =
      (data?.pages.flatMap((page) => page?.data) as Garantia[]) ??
      ([] as Garantia[]);
    return result; // removeDuplicatesFromArrayObjects(result, "garantiaId");
  }, [data]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} pt={3}>
        <Grid container item spacing={3} xs={12}>
          <Grid item xs>
            <Typography variant="h3">
              {tGarantias("admin-panel-garantias:title")}
            </Typography>
          </Grid>
          <Grid container item xs="auto" wrap="nowrap" spacing={2}>
            <Grid item xs="auto">
              <GarantiaFilter />
            </Grid>
            <Grid item xs="auto">
              <Button
                variant="contained"
                LinkComponent={Link}
                href="garantias/create"
                color="success"
              >
                {tGarantias("admin-panel-garantias:actions.create")}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} mb={2}>
          <TableVirtuoso
            style={{ height: 500 }}
            data={result}
            components={TableComponents}
            endReached={handleScroll}
            overscan={20}
            fixedHeaderContent={() => (
              <>
                <TableRow>
                  <TableCell style={{ width: 50 }}></TableCell>
                  <TableSortCellWrapper
                    width={100}
                    orderBy={orderBy}
                    order={order}
                    column="garantiaId"
                    handleRequestSort={handleRequestSort}
                  >
                    {tGarantias("admin-panel-garantias:table.column1")}
                  </TableSortCellWrapper>
                  <TableCell style={{ width: 200 }}>
                    {tGarantias("admin-panel-garantias:table.column2")}
                  </TableCell>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="sku"
                    handleRequestSort={handleRequestSort}
                  >
                    {tGarantias("admin-panel-garantias:table.column3")}
                  </TableSortCellWrapper>
                  <TableCell style={{ width: 200 }}>
                    {tGarantias("admin-panel-garantias:table.column4")}
                  </TableCell>
                  <TableSortCellWrapper
                    orderBy={orderBy}
                    order={order}
                    column="registeredAt"
                    handleRequestSort={handleRequestSort}
                  >
                    {tGarantias("admin-panel-garantias:table.column5")}
                  </TableSortCellWrapper>
                </TableRow>
                {isFetchingNextPage && (
                  <TableRow>
                    <TableCellLoadingContainer colSpan={6}>
                      <LinearProgress />
                    </TableCellLoadingContainer>
                  </TableRow>
                )}
              </>
            )}
            itemContent={(index, garantia) => (
              <>
                <TableCell style={{ width: 130 }}>
                  {!!garantia && <Actions garantia={garantia} />}
                </TableCell>
                <TableCell style={{ width: 100 }}>
                  {garantia?.garantiaId}
                </TableCell>
                <TableCell style={{ width: 200 }}>{garantia?.sku}</TableCell>
                <TableCell>
                  {tGarantias(
                    "admin-panel-garantias:status." + garantia?.status
                  )}
                </TableCell>
                <TableCell style={{ width: 200 }}>
                  {garantia?.firstName} {garantia?.lastName}
                </TableCell>
                <TableCell style={{ width: 80 }}>
                  {daysToNow(garantia?.registeredAt)}
                  {/* Change how the date is shown */}
                </TableCell>
              </>
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default withPageRequiredAuth(Garantias, { roles: [RoleEnum.ADMIN] });
