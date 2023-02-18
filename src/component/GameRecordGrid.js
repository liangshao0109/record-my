import './RecordView.css';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useDbData } from "../utilities/firebase";
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import CardNote from './CardNote';

function GameRecordGrid(data) {
    const [records, error] = useDbData(`/${data.user.uid}`);

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (records === undefined) return <div><CircularProgress color="inherit" /></div>;

    console.log(records);
    const theme = createTheme({
        palette: {
            blue: {
                main: '#50717b',
                dark: '#fff',
            },
            red: {
                main: '#c46352',
                dark: '#fff'
            }
        },
    });




    return (
        <div className="game-record-list">
            <Grid container spacing={1} className="list-grid">
                {records.games.map((game, index) => {
                    console.log(game);
                    return (
                        <Grid item xs={12} sm={4} key={index} className="grid-item">
                            <Card className='grid-card'>
                                <CardMedia
                                    component="img"
                                    alt={game.name}
                                    className="card-image-url"
                                    image={game.image_url}
                                />
                                <Box className="card-box">
                                    <CardContent className="card-content">
                                        <div className='card-game-name'>
                                            {game.name}
                                        </div>
                                        <Divider />
                                        <div className='status-list'>
                                            <div className='status'>
                                                Bought {game.bought ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                                            </div>
                                            <div className='status'>
                                                Played {game.played ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                                            </div>
                                            <div className='status'>
                                                Completed {game.completed ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                                            </div>
                                        </div>
                                        <ThemeProvider theme={theme}>
                                            <CardNote note={game.note} />
                                            
                                            <div className='card-btn-list'>
                                                <Button size="small" color="blue" className='card-btn'><EditIcon fontSize="small" /></Button>
                                                <Button size="small" color="red" className='card-btn'><DeleteIcon fontSize="small" /></Button>
                                            </div>
                                        </ThemeProvider>

                                    </CardContent>
                                </Box>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

export default GameRecordGrid;
