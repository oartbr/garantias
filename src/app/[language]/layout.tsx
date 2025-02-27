import ResponsiveAppBar from "@/components/app-bar";
import AuthProvider from "@/services/auth/auth-provider";
import "../globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { dir } from "i18next";
import "@/services/i18n/config";
import { languages } from "@/services/i18n/config";
import type { Metadata } from "next";
import SnackbarProvider from "@/components/snackbar-provider";
import { getServerTranslation } from "@/services/i18n";
import StoreLanguageProvider from "@/services/i18n/store-language-provider";
import { ThemeProvider } from "@mui/material/styles";
import LeavePageProvider from "@/services/leave-page/leave-page-provider";
import QueryClientProvider from "@/services/react-query/query-client-provider";
import queryClient from "@/services/react-query/query-client";
import ReactQueryDevtools from "@/services/react-query/react-query-devtools";
import GoogleAuthProvider from "@/services/social-auth/google/google-auth-provider";
import FacebookAuthProvider from "@/services/social-auth/facebook/facebook-auth-provider";
import ConfirmDialogProvider from "@/components/confirm-dialog/confirm-dialog-provider";
import InitColorSchemeScript from "@/components/theme/init-color-scheme-script";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import mamutTheme from "@/components/theme/mamut-theme";

type Props = {
  params: { language: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getServerTranslation(params.language, "common");

  return {
    title: t("title"),
    manifest: "/manifest.json",
  };
}

export function generateStaticParams() {
  return languages.map((language) => ({ language }));
}

export default function RootLayout({
  children,
  params: { language },
}: {
  children: React.ReactNode;
  params: { language: string };
}) {
  return (
    <html lang={language} dir={dir(language)} suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        <AppRouterCacheProvider>
          <InitColorSchemeScript />
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ThemeProvider theme={mamutTheme}>
              <CssBaseline />
              <SnackbarProvider maxSnack={3}>
                <StoreLanguageProvider>
                  <ConfirmDialogProvider>
                    <AuthProvider>
                      <GoogleAuthProvider>
                        <FacebookAuthProvider>
                          <LeavePageProvider>
                            <ResponsiveAppBar />
                            {children}
                          </LeavePageProvider>
                        </FacebookAuthProvider>
                      </GoogleAuthProvider>
                    </AuthProvider>
                  </ConfirmDialogProvider>
                </StoreLanguageProvider>
              </SnackbarProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
