import TextField from '@mui/material/TextField';
import './RecordCreateGameForm.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useDbData, useDbUpdate } from "../utilities/firebase";
import CircularProgress from '@mui/material/CircularProgress';


function RecordCreateGameForm(data) {
    const [gameImageURL, setGameImageUrl] = useState('');
    const [gameName, setGameName] = useState('');
    const [gameBought, setGameBought] = useState(false);
    const [gamePlayed, setGamePlayed] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [gameNote, setGameNote] = useState(null);
    const [games, error] = useDbData(`/games/${data.user.uid}`);
    const [update, result] = useDbUpdate(`/games/`);

    useEffect(() => {
        if (data.game != null) {
            setGameImageUrl(data.game.box_art_url);
            setGameName(data.game.name);
        }
    });

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (games === undefined) return <div><CircularProgress color="inherit" /></div>;

    const theme = createTheme({
        palette: {
            white: {
                main: '#fff',
                dark: '#fff',
            },
            blue: {
                main: '#4bb39a',
                dark: '#60a0b0',
            }
        },
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        var newGameRecords = [];
        let uid = data.user.uid
        // TODO: hadle same game?
        const game = {
            "name": gameName,
            "image_url": gameImageURL,
            "bought": gameBought,
            "played": gamePlayed,
            "completed": gameCompleted,
            "note": gameNote,
            "created_at": Date.now(),
            "updated_at": Date.now()
        }
        if (games != null) {
            newGameRecords = games;
            newGameRecords.push(game);
        } else {
            newGameRecords = [game];
        }

        update({
            [uid]: newGameRecords
        });

        window.location.href = "/create-record";
    }

    const handleImageUrlInput = (e) => {
        setGameImageUrl(e.target.value);
    }

    const handleNameInput = (e) => {
        setGameName(e.target.value);
    }

    const handleBoughtInput = (e) => {
        setGameBought(JSON.parse(e.target.value));
    }

    const handlePlayedInput = (e) => {
        setGamePlayed(JSON.parse(e.target.value));
    }

    const handleCompletedInput = (e) => {
        setGameCompleted(JSON.parse(e.target.value));
    }

    const handleNoteInput = (e) => {
        setGameNote(e.target.value);
    }

    const handleCancel = (e) => {
        window.location.href = "/create-record";
    }

    return (
        <div className='game-form'>
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit}>
                    <div className='game-form-input'>
                        <TextField
                            fullWidth
                            id="image-uel-link"
                            label="Game Image Link"
                            variant="outlined"
                            color="white"
                            value={gameImageURL}
                            onChange={handleImageUrlInput} />
                        {/* <div className='or'>OR</div> */}
                        {/* TODO: upload image file */}
                    </div>
                    <Divider />
                    <div className='game-form-input'>
                        <TextField
                            fullWidth
                            id="game-name"
                            label="Game Name"
                            variant="outlined"
                            color="white"
                            value={gameName}
                            onChange={handleNameInput} />
                    </div>
                    <div className='game-form-input'>
                        <FormControl fullWidth>
                            <FormLabel id="bought" color="white">Bought?</FormLabel>
                            <RadioGroup
                                row
                                name="bought"
                                onChange={handleBoughtInput}
                            >
                                <FormControlLabel value="true" control={<Radio color="white" />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio color="white" />} label="Not yet" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='game-form-input'>
                        <FormControl fullWidth>
                            <FormLabel id="played" color="white">Played?</FormLabel>
                            <RadioGroup
                                row
                                name="played"
                                onChange={handlePlayedInput}
                            >
                                <FormControlLabel value="true" control={<Radio color="white" />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio color="white" />} label="Not yet" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='game-form-input'>
                        <FormControl fullWidth>
                            <FormLabel id="completed" color="white">Completed?</FormLabel>
                            <RadioGroup
                                row
                                name="completed"
                                onChange={handleCompletedInput}
                            >
                                <FormControlLabel value="true" control={<Radio color="white" />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio color="white" />} label="Not yet" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='game-form-input'>
                        <TextField
                            id="note"
                            label="Note"
                            color="white"
                            multiline
                            fullWidth
                            rows={4}
                            onChange={handleNoteInput}
                        />
                    </div>
                    <div className='game-form-submit'>
                        <Button
                            type="button"
                            variant="outlined"
                            color="white"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="blue"
                        >
                            Submit
                        </Button>

                    </div>

                </form>
            </ThemeProvider>
        </div>
    );
}

export default RecordCreateGameForm;