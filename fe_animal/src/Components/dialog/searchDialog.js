import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  InputAdornment,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import TitleIcon from "@mui/icons-material/Title";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { tagAPI } from "../../api/tagApi";
import { userApi } from "../../api/userApi";
import { pictureApi } from "../../api/pictureApi";
import { useNavigate } from "react-router-dom";

const SearchDialog = forwardRef(({ title, onClose, ...rest }, ref) => {
  const [open, setOpen] = useState(false);
  const [pics, setPics] = useState([]);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    Open() {
      setOpen(true);
    },
    Close() {
      setOpen(false);
    },
  }));

  useEffect(() => {
    if (open) {
      setSearchStr("");
    }
  }, [open]);

  useEffect(() => {
    find(searchStr);
  }, [searchStr]);

  const onCloseHandler = () => {
    onClose && onClose();
  };

  const find = async (value) => {
    setLoading(true);
    const tagRes = await tagAPI.find(value, 5);
    setTags(tagRes.data);
    const userRes = await userApi.find(value, 5);
    setUsers(userRes.data);
    const picRes = await pictureApi.find(value, 5);
    setPics(picRes.data);
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onCloseHandler} fullWidth>
      <DialogContent sx={{ padding: 1, backgroundColor: "whitesmoke" }}>
        <TextField
          fullWidth
          value={searchStr}
          autoFocus
          tabIndex={0}
          onChange={(e) => setSearchStr(e.target.value)}
          focused
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box paddingTop={1} height={400} sx={{ overflowY: "scroll" }}>
          {loading && <LinearProgress />}
          {pics?.length > 0 && !loading && (
            <>
              <Typography sx={{ fontWeight: 700, fontSize: 18, padding: 2 }}>
                Picture titles
              </Typography>
              <List>
                {pics.map((p) => (
                  <div key={p.id}>
                    <ListItemButton
                      onClick={() => {
                        navigate("/photos/" + p.id);
                        setOpen(false);
                      }}
                      sx={{
                        ":hover": {
                          border: "2px solid #2563eb",
                          color: "#2563eb",
                          backgroundColor: "whitesmoke",
                        },
                        borderRadius: 2,
                      }}
                    >
                      <ListItemIcon>
                        <TitleIcon
                          sx={{ boxShadow: "0 0 2px gray", borderRadius: 1 }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={p.title} />
                    </ListItemButton>
                    <Divider />
                  </div>
                ))}
              </List>
            </>
          )}
          {tags?.length > 0 && !loading && (
            <>
              <Typography sx={{ fontWeight: 700, fontSize: 18, padding: 2 }}>
                Tags
              </Typography>
              <List>
                {tags.map((t) => (
                  <div key={t.id}>
                    <ListItemButton
                      onClick={() => {
                        navigate("/tag", {
                          state: {
                            tagIds: [t.id],
                            authorId: undefined,
                            message: `${t.name} photos`,
                          },
                        });
                        setOpen(false);
                      }}
                      sx={{
                        ":hover": {
                          border: "2px solid #2563eb",
                          color: "#2563eb",
                          backgroundColor: "whitesmoke",
                        },
                        borderRadius: 2,
                      }}
                    >
                      <ListItemIcon>
                        <TagIcon
                          sx={{ boxShadow: "0 0 2px gray", borderRadius: 1 }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={t.name} />
                    </ListItemButton>
                    <Divider />
                  </div>
                ))}
              </List>
            </>
          )}
          {users?.length > 0 && !loading && (
            <>
              <Typography sx={{ fontWeight: 700, fontSize: 18, padding: 2 }}>
                Authors
              </Typography>
              <List>
                {users.map((t) => (
                  <div key={t.id}>
                    <ListItemButton
                      onClick={() => {
                        navigate("/tag", {
                          state: {
                            tagIds: [],
                            authorId: t.id,
                            message: `${t.username}`,
                          },
                        });
                        setOpen(false);
                      }}
                      sx={{
                        ":hover": {
                          border: "1px solid blue",
                          color: "blue",
                          backgroundColor: "white",
                        },
                        borderRadius: 2,
                      }}
                    >
                      <ListItemIcon>
                        <AccountBoxIcon
                          sx={{ boxShadow: "0 0 2px gray", borderRadius: 1 }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={t.username} />
                    </ListItemButton>
                    <Divider />
                  </div>
                ))}
              </List>
            </>
          )}
          {!loading &&
            users.length === 0 &&
            pics.length === 0 &&
            tags.length === 0 &&
            searchStr !== "" && (
              <Box>
                <Grid
                  container
                  spacing={1}
                  justifyContent="center"
                  alignItems="end"
                >
                  <Grid item>
                    <Typography sx={{ fontWeight: 700, fontSize: 24 }}>
                      Not Results
                    </Typography>
                  </Grid>
                  <Grid item>
                    <SearchOffIcon fontSize="large" />
                  </Grid>
                </Grid>
              </Box>
            )}
        </Box>
      </DialogContent>
    </Dialog>
  );
});

export default SearchDialog;
