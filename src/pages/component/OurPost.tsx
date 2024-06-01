import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

export default function OurPost() {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        m: 2.5,
        color: theme.palette.text.primary,
      }}
    >
      <Stack direction="column">
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <AccountCircle sx={{ fontSize: 31 }} />
            <Typography
              sx={{
                ml: "10px",
                fontSize: "14px",
                fontWeight: 500,
                color: theme.palette.custom.base300,
              }}
            >
              username
            </Typography>
          </Stack>
          <Stack direction="row">
            <Stack
              sx={{
                mr: "15px",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Image
                src="/icon/pen.svg"
                alt="message-icon"
                width={16}
                height={16}
              />
            </Stack>
            <Stack
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Image
                src="/icon/trash.svg"
                alt="message-icon"
                width={16}
                height={16}
              />
            </Stack>
          </Stack>
        </Stack>
        <Box
          sx={{
            mt: 1,
          }}
        >
          <Chip
            label="History"
            size="small"
            className="customChipWidth"
            sx={{
              fontSize: 10,
              fontWeight: 400,
              color: "#4A4A4A",
            }}
          />
        </Box>
        <Typography
          sx={{
            mt: 0.5,
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          Title The afterlife
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "12px",
            color: theme.palette.text.primary,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            wordBreak: "break-word",
          }}
        >
          The afterlife sitcom The Good Place comes to its culmination, the
          show’s two protagonists, Eleanor and Chidi, contemplate their future.
          Having lived thousands upon thousands of lifetimes together, and
          having experienced virtually everything this life has to offer, they
          are weary. It is time for it all to end. The show’s solution to this
          perpetual happiness-cum-weariness is extinction. When you have had
          enough, when you are utterly sated by love and joy and pleasure, you
          can walk through a passage to nothingness. And Chidi has had enough.
        </Typography>
        <Stack direction="row" sx={{ alignItems: "center", mt: 1.25 }}>
          <Stack>
            <Image
              src="/icon/message.svg"
              alt="message-icon"
              width={16}
              height={16}
            />
          </Stack>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 400,
              ml: "5px",
              color: theme.palette.custom.base300,
            }}
          >
            32 Comments
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
