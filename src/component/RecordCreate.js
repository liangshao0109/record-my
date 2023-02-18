import Button from '@mui/material/Button';
import './RecordCreate.css';
import { useState } from 'react';
import SportsEsportsTwoToneIcon from '@mui/icons-material/SportsEsportsTwoTone';
import ImportContactsTwoToneIcon from '@mui/icons-material/ImportContactsTwoTone';
import MovieCreationTwoToneIcon from '@mui/icons-material/MovieCreationTwoTone';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function RecordCreate() {
    const [formats, setFormats] = useState(null);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    const theme = createTheme({
        palette: {
            brown: {
                main: '#412525',
                dark: '#eee'
            },
            blue: {
                main: '#4bb39a',
                dark: '#60a0b0',
            }
        },
    });

    const submitType = () => {
        //TODO: show error text when user didn't choose a type
        if(formats){
            window.location.href = `/create-record/${formats}`;
        }
    }

    return (
        <div>
            Choose type:
            <ThemeProvider theme={theme}>
                <div className='type-list'>
                    <ToggleButtonGroup
                        value={formats}
                        exclusive
                        onChange={handleFormat}
                        className='toggle-btn-group'
                    >
                        <ToggleButton
                            value="1"
                            aria-label="game"
                            color="brown"
                            className='toggle-btn'>
                            <SportsEsportsTwoToneIcon />
                            game
                        </ToggleButton>
                        <ToggleButton
                            value="2"
                            aria-label="novel"
                            color="brown"
                            className='toggle-btn'>
                            <ImportContactsTwoToneIcon />
                            novel
                        </ToggleButton>
                        <ToggleButton
                            value="3"
                            aria-label="series"
                            color="brown"
                            className='toggle-btn'>
                            <MovieCreationTwoToneIcon />
                            movie series
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <Button 
                    variant="contained" 
                    color="blue" 
                    className='submit-btn'
                    endIcon={<SendIcon />}
                    onClick={submitType}>
                    Send
                </Button>
            </ThemeProvider>
        </div>
    );
}

export default RecordCreate;
