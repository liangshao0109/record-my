import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './RecordCreateGame.css';
import RecordCreateGameForm from './RecordCreateGameForm';

function RecordCreateGame() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [listOpen, setListOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchGameList, setSearchGameList] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [choosedGame, setChoosedGame] = useState(null);

    const handleSearchClickOpen = () => {
        setSearchOpen(true);
    };

    const handleSearchClose = () => {
        setSearchOpen(false);
    };

    const handleListClickOpen = () => {
        setListOpen(true);
    };

    const handleListClose = () => {
        setListOpen(false);
    };

    const setTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    const getList = async () => {
        var body = {
            client_id: 'czyouyw08bkbktl0xfhnimxa02is2x',
            client_secret: 'qjutcpodzq1ykse18de7c0ft1iheys',
            grant_type: 'client_credentials'
        };

        var formBody = [];
        for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log(formBody);

        let response = await fetch("https://id.twitch.tv/oauth2/token", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody
        })
            .then(res => {
                res.json().then(data => {
                    getGameList(data.access_token)
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    const getGameList = async (token) => {
        let authToken = 'Bearer ' + token;
        let term = encodeURIComponent(searchTerm);
        let url = "https://api.twitch.tv/helix/search/categories?query=" + term;
        let response = await fetch(url, {
            method: "GET",
            headers: new Headers({
                'Authorization': authToken,
                'Client-Id': 'czyouyw08bkbktl0xfhnimxa02is2x',
            }),
        })
            .then(res => {
                res.json().then(list => {
                    console.log(list.data);
                    setSearchGameList(list.data);
                    handleSearchClose();
                    handleListClickOpen();
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleSearch = () => {
        if (searchTerm) {
            getList();
        }
    }

    const theme = createTheme({
        palette: {
            blue: {
                main: '#4bb39a',
                dark: '#60a0b0',
            }
        },
    });

    const handleGameSelect = (game) => {
        setSelectedGame(game);
    }

    const submitChooseGame = () => {
        setChoosedGame(selectedGame);
        handleListClose();
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <div className='instruction'>
                    Press "SEARCH GAME" to find the game you would like to add.
                </div>
                <Button
                    variant="contained"
                    color="blue"
                    onClick={handleSearchClickOpen}
                >
                    Search Game
                </Button>
                <RecordCreateGameForm game={choosedGame} />
                <Dialog
                    open={searchOpen}
                    onClose={handleSearchClose}
                >
                    <DialogTitle sx={{
                        backgroundColor: "#8ecccc",
                        color: "#50717b"
                    }}>Search Game</DialogTitle>
                    <DialogContent sx={{
                        backgroundColor: "#8ecccc",
                        color: "#50717b"
                    }}>
                        <DialogContentText>
                            To search a game, please enter keyword here.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={searchTerm}
                            onChange={setTerm}
                        />
                    </DialogContent>
                    <DialogActions sx={{
                        backgroundColor: "#8ecccc",
                        color: "#50717b"
                    }}>
                        <Button onClick={handleSearchClose}>Cancel</Button>
                        <Button onClick={handleSearch}>Search</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={listOpen}
                    onClose={handleListClose}
                >
                    <DialogTitle sx={{
                        backgroundColor: "#8ecccc",
                        color: "#50717b"
                    }}>Game List</DialogTitle>
                    <DialogContent sx={{
                        backgroundColor: "#8ecccc",
                        color: "#50717b"
                    }}>
                        <DialogContentText>
                            choose the game you would like to add
                            {searchGameList.map((game, i) => {
                                console.log(game);
                                // Return the element. Also pass key     
                                return (
                                    <div className={selectedGame == game ? 'game-detail selected' : 'game-detail'} onClick={() => handleGameSelect(game)}>
                                        <img className='game-thumbnail' src={game.box_art_url} />
                                        <div className='game-name'>{game.name}</div>
                                    </div>
                                )
                            })}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{
                        backgroundColor: "#8ecccc",
                        color: "#50717b"
                    }}>
                        <Button onClick={handleListClose}>Cancel</Button>
                        <Button onClick={submitChooseGame}>Choose</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </div>
    );
}

export default RecordCreateGame;
