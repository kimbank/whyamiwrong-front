"use client";
import { usePathname } from "next/navigation";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import DashboardIcon from "@mui/icons-material/Dashboard";
import { Box, Button } from "@mui/material";

export default function Header({ auth_user = false }) {
  const pathname = usePathname();

  if (pathname.startsWith("/login") || pathname.startsWith("/api")) {
    return <></>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: 2000 }}>
        <Toolbar sx={{ backgroundColor: "background.paper", display: 'flex', gap: '8px' }}>
          {/* Left Side */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
            <Typography variant="h6" color="text.primary" sx={{ mr: '16px' }}>
              WhyamiWrong
            </Typography>
            <Box sx={{ display: 'flex', gap: '16px' }}>
              <Button href="/algorithm">
                Algorithm
              </Button>
              <Button href="/snack-quiz">
                Snack Quiz
              </Button>
              <Button href="code-review">
                Code Reivew
              </Button>
              <Button href="ranking">
                Ranking
              </Button>
            </Box>
          </Box>

          {/* Right Side */}
          <Box sx={{ display: 'flex', gap: '8px' }}>
            {!auth_user ? (
              <>
                <Button variant="outlined" href="/login">로그인</Button>
                <Button variant="contained" sx={{boxShadow: 'none'}}>회원가입</Button>
              </>
            ) : (
              <>
                <Button variant="outlined">{auth_user?.id} 로그아웃</Button>
                <Button variant="contained" sx={{boxShadow: 'none'}}>내 정보</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
