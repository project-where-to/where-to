import React, { useEffect, useState } from "react";
import axios from "axios";
import { useEventsStore, useProfileStore, useMapStore } from "../../globalState.jsx";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import MapModal from "../Testing/Testing.jsx";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Divider from "@mui/material/Divider";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Events = () => {
  const { events, setEvents } = useEventsStore();
  const { profile } = useProfileStore();
  const { isToggle, toggle } = useMapStore();
  const [selectedDate, setSelectedDate] = useState(null);
  const [sortBy, setSortBy] = useState("likes");
  const [filterBy, setFilterBy] = useState([]);
  const [toggleMap, setToggleMap] = useState(false);
  const [mapAddress, setMapAddress] = useState(null);

  const sortEvents = (events, sortBy) => {
    events.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return b.likes - a.likes;
      }
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterByChange = (event, value) => {
    setFilterBy(value);
  };

  const handleAddToCalendar = (event) => {
    const { eventId } = event;

    axios
      .post("/api/addToCalendar", { eventId })
      .then((response) => {
        console.log(response.data);
        sortEvents(response.data, sortBy);
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteFromCalendar = (event) => {
    const { eventId } = event;

    axios
      .delete(`/api/deleteFromCalendar/${eventId}`)
      .then((response) => {
        sortEvents(response.data, sortBy);
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddLike = (event) => {
    const { eventId } = event;

    axios
      .post("/api/addLike", { eventId })
      .then((response) => {
        console.log(response.data);
        sortEvents(response.data, sortBy);
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteLike = (event) => {
    const { eventId } = event;

    axios
      .delete(`/api/deleteLike/${eventId}`)
      .then((response) => {
        sortEvents(response.data, sortBy);
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log('hit')
    axios
      .get("/api/events")
      .then((response) => {
        const fetchedEvents = response.data;
        sortEvents(fetchedEvents, sortBy);
        setEvents(fetchedEvents);
        console.log(fetchedEvents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let filteredEvents = events;

    if (filterBy.includes("My Events")) {
      filteredEvents = events.filter(
        (event) => event.user.username === profile.username
      );
    }

    if (selectedDate) {
      filteredEvents = filteredEvents.filter(
        (event) =>
          new Date(event.date).toLocaleDateString() ===
          selectedDate.$d.toLocaleDateString()
      );
    }
    sortEvents(filteredEvents, sortBy);
    setEvents(filteredEvents);
  }, [selectedDate, sortBy, filterBy]);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const AllBtn = styled(IconButton)(({ theme }) => ({
    color: "black",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
    "&:hover": {
      backgroundColor: "#ac00e6",
      borderRadius: 20,
      color: "white",
    },
  }));
  const theme = createTheme({
    palette: {
      primary: {
        main: "#bf00ff",
      },
      secondary: {
        main: "#ac00e6",
      },
      background: {
        main: "#99D5C9",
      },
    },
    typography: {
      fontSize: 13,
      display: "flex",
      flexDirection: "column",
      h2: {
        fontSize: "1.3rem",
        bold: "true",
        fontWeight: 100,
        padding: "5px 0px 5px 0px",
      },
      h3: {
        fontSize: ".8rem",
        color: "#ac00e6",
        "&:hover": {
          cursor: "pointer",
          textDecoration: "underline",
        },
    },

    modal: {
      padding: 0,
    }
    }
});

  return (
    <Box element='div' sx={{p: '0px 0px 60px 0px'}}>
    <ThemeProvider theme={theme}>
    <MapModal address={mapAddress} />
      <Box display="flex" justifyContent="center" alignItems="center" py={1} pb={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container components={["DatePicker"]}>
            <MobileDatePicker
              label="Choose Event Date"
              variant="body1"
              onChange={handleDateChange}
              sx={{ bgcolor: 'white'}}
            />
          </Container>
        </LocalizationProvider>
      </Box>
      <Box display="flex" justifyContent="center" alignContent="center">
        <Autocomplete
          sx={{bgcolor: 'white'}}
          multiple
          id="filters"
          options={["18+", "21+", "My Events"]}
          disableCloseOnSelect
          onChange={handleFilterByChange}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          style={{ width: 180, bgcolor: 'white' }}
          renderInput={(params) => (
            <TextField {...params} label="Filter By..." placeholder="Filters" />
          )}
        />
        <FormControl sx={{ ml: 3, borderRadius: "25px"}}>
          <InputLabel id="sort-by-label" sx={{m: '0px 0px 0px 0px', borderRadius: "25px", bgcolor: '#787878', fontSize: '14px', p: '0px 4px 0px 4px', color: 'white'}}>Sort By: </InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            value={sortBy}
            onChange={handleSortByChange}
            sx={{ borderRadius: '25px', bgcolor: 'white'}}
          >
            <MenuItem value="likes">Most Liked</MenuItem>
            <MenuItem value="date">Event Date</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Container sx={{ py: 3 }} maxWidth="md">
        {events.length === 0 ? (
          <Typography variant="h2" color="text.primary">
            No events found for the selected date.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {events.map((event) => (
              <Grid item key={event.eventId} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    boxShadow: "0px 0px 0px 1px",
                    bgcolor: 'white'
                  }}
                  >
                  <CardHeader
                    avatar={<Avatar src={event.user.profilePic} />}
                    sx={{ height: "60px", display: 'flex', alignItems: 'start', gap: '140px', pb: '50px'}}
                    title={`${event.user.username}`}
                    />
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${event.image}`}
                    alt="Event Image"
                    />
                  <CardContent>
                    <Typography variant="h2" color="text.primary" >
                    
                      
                      {event.name}
                        
                    <Typography variant="body2" color="text.secondary">
                      {event.ages}+
                    </Typography>
                    </Typography>
                    <Typography variant="h3" 
                    color='text.primary'
                    onClick={() => {
                       toggle()
                       setMapAddress(event.address)
                      }}>
                      {event.address}
                    </Typography>
                    <Divider sx={{bgcolor: "black", mt: 1.5, mb: 1.5}} />
                    <Typography variant="body2" color="text.secondary">
                      <AccessTimeIcon/>
                      {new Date(event.date).toLocaleString("en-US", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </Typography>
                      <Divider sx={{bgcolor: "black", mt: 1.5, mb: 1.5}} />
                      
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                      
                  </CardContent>
                  <CardActions
                    disableSpacing
                    sx={{
                      marginTop: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                      bgcolor: '#f0f0f0'
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        onClick={(evt) => {
                          evt.stopPropagation()
                          if (event.Likeds[0]) {
                            handleDeleteLike(event);
                          } else {
                            handleAddLike(event);
                          }
                        }}
                        {...label}
                        defaultChecked={event.Likeds[0] ? true : false}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite style={{ color: "red" }} />}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {event.likes}
                      </Typography>
                    </div>
                    <Checkbox
                      onClick={(evt) => {
                        evt.stopPropagation()
                        if (event.SavedEvents[0]) {
                          handleDeleteFromCalendar(event);
                        } else {
                          handleAddToCalendar(event);
                        }
                      }}
                      {...label}
                      defaultChecked={event.SavedEvents[0] ? true : false}
                      icon={<AddIcon />}
                      checkedIcon={<CheckIcon style={{ color: "green" }} />}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      </ThemeProvider>
    </Box>
  );
};

export default Events;
