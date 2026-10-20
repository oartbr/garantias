"use client";
import Stack from "@mui/material/Stack";

import Grid from "@mui/material/Grid";
import FacebookAuth from "./facebook/facebook-auth";
import { isFacebookAuthEnabled } from "./facebook/facebook-config";
import GoogleAuth from "./google/google-auth";
import { isGoogleAuthEnabled } from "./google/google-config";

export default function SocialAuth() {
  return (
    <Grid container spacing={2}>
      {isGoogleAuthEnabled && (
        <Grid size={12}>
          <GoogleAuth />
        </Grid>
      )}
      {isFacebookAuthEnabled && (
        <Stack direction="column">
          <FacebookAuth />
        </Stack>
      )}
    </Grid>
  );
}
