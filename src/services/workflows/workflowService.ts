// workflowService.ts
export interface Item {
  status?: string | undefined;
  garantiaId?: string;
}

export interface User {
  role?: {
    name?: string;
  };
}
// Allow User to be null
export type flowUser = User | null;

interface WorkflowData {
  message: string;
  route: string;
  action: string;
}

export interface StatusRoutes {
  [status: string]: {
    [role: string]: {
      message: string;
      route: string;
      action: string;
    };
  };
}

export class WorkflowService {
  item?: Item;
  user?: flowUser;
  routes: StatusRoutes;

  constructor(item: Item, user: flowUser, routes: StatusRoutes) {
    this.item = item;
    this.user = user || { role: { name: "USER" } };
    this.routes = routes;
  }

  getWorkflowData(): WorkflowData {
    const { status, garantiaId } = this.item || {};
    const role = this.user?.role?.name || "USER";

    const routeData = this.routes[status || ""]?.[role] ||
      this.routes[status || ""]?.default || {
        message: "",
        route: "/error",
        action: "Close",
      };

    return {
      message: routeData.message.replace("{garantiaId}", garantiaId || ""),
      route: routeData.route.replace("{garantiaId}", garantiaId || ""),
      action: routeData.action,
    };
  }
}
