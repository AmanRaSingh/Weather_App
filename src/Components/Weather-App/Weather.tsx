import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import { Box, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';

interface WeatherState {
    location: {
        name: string;
        country:string;
        localtime:string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        };
    };
}

interface WeatherProps {}

export default class Weather extends Component<WeatherProps, WeatherState> {
    constructor(props: WeatherProps) {
        super(props);
        this.state = {
            location: {
                name: "",
                country:"",
                localtime:""
            },
            current: {
                temp_c: 0,
                condition: {
                    text: "",
                    icon: "",
                }
            }
        };
    }

    fetchWeatherData = (location: string) => {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=c2a623add98448cfa4272716240806&q=${location}&aqi=no`)
            .then(response => {
                this.setState({
                    location:{
                        name:response.data.location.name,
                        country:response.data.location.country,
                        localtime:response.data.location.localtime
                    },
                    current:response.data.current
                    // location: response.data.location,
                    // current: response.data.current,
                    // localtime:response.data.localtime
                });
                console.log(response);
            })
            .catch(error => {
                console.log("Showing error from API", error);
            });
    }

    handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const location = event.target.value;
        this.setState({
            location: {
                name: location,
                country:this.state.location.country,
                localtime:this.state.location.localtime
            }
        });
    }

    handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.fetchWeatherData(this.state.location.name);
    }

    render() {
        const { location, current } = this.state;
        return (
            <>
                <Box component="section" sx={{ p: 2, fontSize: "30px" }}>
                    Weather app.
                </Box>
                <form onSubmit={this.handleFormSubmit}>
                    <TextField
                        id="outlined-basic"
                        label="Enter Location"
                        variant="outlined"
                        value={location.name}
                        onChange={this.handleLocationChange}
                    />
                    <Button type="submit" variant="contained" color="primary" sx
                    ={{height:"3rem"}}>
                        Get Weather
                    </Button>
                </form>

                <List>
                    <ListItem>
                        <ListItemText primary={`Temperature: ${current.temp_c}°C`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Condition: ${current.condition.text}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Country: ${location.country}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Local Time: ${location.localtime}`} />
                    </ListItem> 
                    <ListItem>
                        <ListItemText primary={<img src={current.condition.icon} alt="weather icon" />} />
                    </ListItem>
                </List>
            </>
        );
    }
}
