import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PostInterface from "../interfaces/post.interface";

interface OurPostProps {
  handleEdit: () => void;
  handleDelete: () => void;
  post: PostInterface;
}

export default function OurPost({
  handleEdit,
  handleDelete,
  post,
}: OurPostProps) {
  const theme = useTheme();
  const router = useRouter();

  const handleRedirectToDetail = () => {
    router.push(`/post-detail/${post.id}`);
  };

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
              {post?.user?.username}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Stack
              onClick={handleEdit}
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
              onClick={handleDelete}
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
            label={post.communityType}
            size="small"
            className="customChipWidth"
            sx={{
              fontSize: 10,
              fontWeight: 400,
              color: "#4A4A4A",
            }}
          />
        </Box>
        <Stack
          onClick={handleRedirectToDetail}
          sx={{ ":hover": { cursor: "pointer" } }}
        >
          <Typography
            sx={{
              mt: 0.5,
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            {post.title}
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
            {post.content}
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
              {post.comments.length} Comments
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
