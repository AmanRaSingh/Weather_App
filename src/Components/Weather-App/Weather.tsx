// import { Component } from 'react'
// import TextField from '@mui/material/TextField';
// import { Box, List, ListItem, ListItemText } from '@mui/material';
// import axios from 'axios';
// import { error } from 'console';
// import { text } from 'stream/consumers';

// interface WeatherState {
//     location: {
//         name: string
//     };
//     current: {
//         temp_c: number;
//         condition: {
//             text: string;
//             icon: string;
//         }
//     }
// }
// export default class Weather extends Component {
//     constructor(props: WeatherState) {
//         super(props)
//         this.state = {
//             location: {
//                 name: "",
//             },
//             current: {
//                 temp_c: 0,
//                 conditon: {
//                     text: "",
//                     icon: ""
//                 }
//             }
//         }
//     }

//     componentDidMount() {
//         axios.get("https://api.weatherapi.com/v1/current.json?key=c2a623add98448cfa4272716240806&q=India&aqi=no")
//             .then(response => {
//                 this.setState(response.data)
//                 console.log(response)
//             })
//             .catch(error => {
//                 console.log("Shoing error  from api", error)
//             })
//     }

//     render() {
//         const { location } = this.state
//         return (
//             <>
//                 <Box component="section" sx={{ p: 2, fontSize: "30px" }}>
//                     Weather app.
//                 </Box>
//                 <TextField id="outlined-basic" label="Outlined" variant="outlined" />

//                 <List>
//                     <ListItem>
//                         {/* <ListItemText primary="aman" /> */}
//                         <ListItemText primary={`Location: ${location.name}`} />
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText primary="aman" />
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText primary="aman" />
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText primary="aman" />
//                     </ListItem>
//                 </List>

//             </>
//         )
//     }
// }


// import React, { Component } from 'react';
// import TextField from '@mui/material/TextField';
// import { Box, List, ListItem, ListItemText } from '@mui/material';
// import axios from 'axios';

// interface WeatherState {
//     location: {
//         name: string;
//     };
//     current: {
//         temp_c: number;
//         condition: {
//             text: string;
//             icon: string;
//         };
//     };
// }

// interface WeatherProps {}

// export default class Weather extends Component<WeatherProps, WeatherState> {
//     constructor(props: WeatherProps) {
//         super(props);
//         this.state = {
//             location: {
//                 name: "",
//             },
//             current: {
//                 temp_c: 0,
//                 condition: {
//                     text: "",
//                     icon: ""
//                 }
//             }
//         };
//     }

//     componentDidMount() {
//         axios.get("https://api.weatherapi.com/v1/current.json?key=c2a623add98448cfa4272716240806&q=India&aqi=no")
//             .then(response => {
//                 this.setState({
//                     location: response.data.location,
//                     current: response.data.current
//                 });
//                 console.log(response);
//             })
//             .catch(error => {
//                 console.log("Showing error from API", error);
//             });
//     }

//     render() {
//         const { location, current } = this.state;
//         return (
//             <>
//                 <Box component="section" sx={{ p: 2, fontSize: "30px" }}>
//                     Weather app.
//                 </Box>
//                 <TextField id="outlined-basic" label="Location" variant="outlined" value={location.name} InputProps={{readOnly:false}}/>

//                 <List>
                  
//                     <ListItem>
//                         <ListItemText primary={`Temperature: ${current.temp_c}°C`} />
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText primary={`Condition: ${current.condition.text}`} />
//                     </ListItem>
//                     <ListItem>
//                         <ListItemText primary={<img src={current.condition.icon} alt="weather icon" />} />
//                     </ListItem>
//                 </List>
//             </>
//         );
//     }
// }



import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import { Box, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';

interface WeatherState {
    location: {
        name: string;
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
            },
            current: {
                temp_c: 0,
                condition: {
                    text: "",
                    icon: ""
                }
            }
        };
    }

    fetchWeatherData = (location: string) => {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=c2a623add98448cfa4272716240806&q=${location}&aqi=no`)
            .then(response => {
                this.setState({
                    location: response.data.location,
                    current: response.data.current
                });
                // console.log(response);
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
                    <Button type="submit" variant="contained" color="primary">
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
                        <ListItemText primary={<img src={current.condition.icon} alt="weather icon" />} />
                    </ListItem>
                </List>
            </>
        );
    }
}
