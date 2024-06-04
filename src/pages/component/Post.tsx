import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import PostInterface from "../interfaces/post.interface";
interface PostProps {
  post: PostInterface;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { user, comments, content, title, communityType } = post;

  const theme = useTheme();
  return (
    <Stack
      sx={{
        m: 2.5,
        color: theme.palette.text.primary,
      }}
    >
      <Stack direction="column">
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
            {user?.username}
          </Typography>
        </Stack>
        <Box
          sx={{
            mt: 1,
          }}
        >
          <Chip
            label={communityType}
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
          {title}
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
          {content}
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
            {comments.length} Comments
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Post;
