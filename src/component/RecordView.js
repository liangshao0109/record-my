
import './RecordView.css';
import { useAuthState } from '../utilities/firebase';
import CircularProgress from '@mui/material/CircularProgress';
import GameRecordGrid from './GameRecordGrid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NovelRecordGrid from './NovelRecordGrid';

function RecordView() {
    const [user] = useAuthState();
    const [tabValue, setTabValue] = useState("1");

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const theme = createTheme({
        palette: {
            lightblue: {
                main: '#8ecccc',
                dark: '#50717b',
            },
        },
    });

    const handleAddRecord = () => {
        window.location.href = "/create-record/" + tabValue;
    }

    //TODO: some filters?

    return (
        <div>
            {user ?
                <div className='record-list'>
                    <div className='record-title'>
                        My Record
                    </div>
                    <Box className="records-box">
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            textColor="inherit"
                            variant="fullWidth"
                            centered
                            className='record-tabs'
                        >
                            <Tab value="1" label="Game" icon={<SportsEsportsIcon fontSize='large' />} iconPosition='start' className='record-tab' />
                            <Tab value="2" label="Novel" icon={<MenuBookIcon fontSize='large' />} iconPosition='start' className='record-tab' />
                            <Tab value="3" label="Movie Series" className='record-tab' />
                        </Tabs>
                    </Box>

                    {tabValue == "1" ? <GameRecordGrid user={user} /> : ''}
                    {tabValue == "2" ? <NovelRecordGrid user={user} /> : ''}

                    <ThemeProvider theme={theme}>
                        <Fab color="lightblue" aria-label="add" className='fab-add' onClick={handleAddRecord}>
                            <AddIcon />
                        </Fab>
                    </ThemeProvider>
                    
                </div>
                :
                <div>
                    <CircularProgress color="inherit" />
                </div>
            }
        </div>
    );
}

export default RecordView;
