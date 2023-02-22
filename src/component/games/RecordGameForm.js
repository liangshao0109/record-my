import { useState } from 'react';
import { useDbData, useDbUpdate } from "../../utilities/firebase";
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './RecordGameForm.css';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

function RecordGameForm(data) {
    console.log(data)
    const [games, error] = useDbData(`/${data.user.uid}/games`);
    const [update, result] = useDbUpdate(`/${data.user.uid}`);
    const [init, setInit] = useState(false);

    const [gameImageURL, setGameImageUrl] = useState('');
    const [gameName, setGameName] = useState('');
    const [gameBought, setGameBought] = useState(false);
    const [gamePlayed, setGamePlayed] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [gameNote, setGameNote] = useState('');

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (games === undefined) return <div><CircularProgress color="inherit" /></div>;

    var game = null;

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

    if (!init) {
        if (data.mode == 'Create' && data.choosedGame) {
            setGameImageUrl(data.choosedGame.box_art_url);
            setGameName(data.choosedGame.name);
            setInit(true);
        } else if (data.mode == 'Edit') {
            game = games.filter(game => game.id == data.id)[0];

            setGameImageUrl(game.image_url);
            setGameName(game.name);
            setGameBought(game.bought);
            setGamePlayed(game.played);
            setGameCompleted(game.completed);
            setGameNote(game.note);
            setInit(true);
        }
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
        if (data.mode == 'Create') {
            window.location.href = "/create-record";
        } else if (data.mode == 'Edit') {
            window.location.href = "/view-records";
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        var newGameRecords = [];
        var gameId = 0;

        const gameRecord = {
            "name": gameName,
            "image_url": gameImageURL,
            "bought": gameBought,
            "played": gamePlayed,
            "completed": gameCompleted,
            "note": gameNote,
            "updated_at": Date.now()
        }

        if (data.mode == 'Create') {
            if (games) {
                const sortedGameRecords = games.sort((a, b) => b.id - a.id);
                gameId = sortedGameRecords[0].id + 1;
            }
            // TODO: hadle same game?
            // TODO: validation

            gameRecord["id"] = gameId;
            gameRecord["created_at"] = Date.now();

            if (games != null) {
                newGameRecords = games;
                newGameRecords.push(gameRecord);
            } else {
                newGameRecords = [gameRecord];
            }

        } else if (data.mode == 'Edit') {
            game = games.filter(game => game.id == data.id)[0];
            newGameRecords = games.filter(game => game.id != data.id);

            gameRecord["id"] = data.id;
            gameRecord["created_at"] = game.created_at;

            newGameRecords.push(gameRecord);
        }

        update({
            "games": newGameRecords
        });

        window.location.href = "/view-records";
    }

    return (
        <div className='game-form'>
            <div className="title">{data.mode} Record</div>
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit}>
                    <div className='game-form-input'>
                        <TextField
                            fullWidth
                            id="image-url-link"
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
                            <FormLabel className="form-label" id="bought" color="white">Bought?</FormLabel>
                            <RadioGroup
                                row
                                name="bought"
                                onChange={handleBoughtInput}
                                value={gameBought ? "true" : "false"}
                            >
                                <FormControlLabel className="form-control-label" value="true" control={<Radio color="white" />} label="Yes" />
                                <FormControlLabel className="form-control-label" value="false" control={<Radio color="white" />} label="Not yet" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='game-form-input'>
                        <FormControl fullWidth>
                            <FormLabel className="form-label" id="played" color="white">Played?</FormLabel>
                            <RadioGroup
                                row
                                name="played"
                                onChange={handlePlayedInput}
                                value={gamePlayed ? "true" : "false"}
                            >
                                <FormControlLabel className="form-control-label" value="true" control={<Radio color="white" />} label="Yes" />
                                <FormControlLabel className="form-control-label" value="false" control={<Radio color="white" />} label="Not yet" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='game-form-input'>
                        <FormControl fullWidth>
                            <FormLabel className="form-label" id="completed" color="white">Completed?</FormLabel>
                            <RadioGroup
                                row
                                name="completed"
                                onChange={handleCompletedInput}
                                value={gameCompleted ? "true" : "false"}
                            >
                                <FormControlLabel className="form-control-label" value="true" control={<Radio color="white" />} label="Yes" />
                                <FormControlLabel className="form-control-label" value="false" control={<Radio color="white" />} label="Not yet" />
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
                            value={gameNote}
                        />
                    </div>
                    <div className='game-form-submit'>
                        <Button
                            className='form-btn'
                            type="button"
                            variant="outlined"
                            color="white"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            className='form-btn'
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

export default RecordGameForm;
