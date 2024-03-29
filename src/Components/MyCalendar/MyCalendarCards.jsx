import React, { useEffect } from "react";
import { useEventsStore } from "../../globalState.jsx";
import { Box, Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import axios from "axios";

const MyCalendarCard = ({ initialEventData, event, onDelete }) => {
  const { events, setEvents } = useEventsStore();

  const handleDeleteFromCalendar = (initialEventData) => {
    const { eventId } = initialEventData;

    axios
      .delete(`/api/deleteFromCalendar/${eventId}`)
      .then((response) => {
        onDelete(eventId);
        setEvents(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid item >
      <Card
        sx={{
          display: "flex",
          flexDirection: 'row',
          mb: 1,
          pt: 1,
          pl: 1,
          pb: 1,
          borderRadius: "16px",
          boxShadow: "0px 0px 0px 1px",
          bgcolor: 'white',
          alignContent: 'center',
          alignItems: 'center',
          maxWidth: '365px'
        }}
      >
        <CardMedia
          component="img"
          sx={{ maxWidth: 140, height: 180, borderRadius: "12px" }}
          image={`${initialEventData.image}`}
          alt="Event image"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "0px 0px 0px 0px",
        
          }}
        >
          <CardContent sx={{ flex: "2 0 auto" }}>
            <Typography
              component="div"
              variant="h7"
              sx={{ fontWeight: "bold", pb: "10px",display: 'flex', alignContent: 'center', alignItems: 'center' }}
            >
              {initialEventData.name}
            </Typography>
            <Typography
              sx={{ fontSize: "12px" }}
              color="text.secondary"
              component="div"
            >
              {initialEventData.address}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography
                color="text.primary"
                component="div"
                sx={{
                  textDecoration: "underline",
                  p: "0px 15px 0px 0px",
                  fontSize: "12px",
                }}
              >
                {new Date(initialEventData.date).toLocaleString("en-US", {
                  dateStyle: "long",
                })}
              </Typography>
              <Typography
                color="green"
                component="div"
                sx={{ fontSize: "12px", p: "0px 0px 0px 10px" }}
              >
                {new Date(initialEventData.date).toLocaleString("en-US", {
                  timeStyle: "short",
                })}
              </Typography>
            </Box>
          </CardContent>
        </Box>
        <Box>
        <CardActions>
          <IconButton
            sx={{ mb: "140px", color: "red", width: "20px", height: "5px" }}
            onClick={() => handleDeleteFromCalendar(initialEventData)}
          >
            <CancelSharpIcon />
          </IconButton>
        </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};

export default MyCalendarCard;
