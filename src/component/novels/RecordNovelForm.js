import { useDbData, useDbUpdate } from "../../utilities/firebase";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import './RecordNovelForm.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

function RecordNovelForm(data) {
    const [novels, error] = useDbData(`/${data.user.uid}/novels`);
    const [update, result] = useDbUpdate(`/${data.user.uid}`);
    const [init, setInit] = useState(false);

    const [novelName, setNovelName] = useState('');
    const [novelURL, setNovelURL] = useState('');
    const [novelLatestChapter, setNovelLatestChapter] = useState('');
    const [novelCompleted, setNovelCompleted] = useState(false);
    const [novelNote, setNovelNote] = useState('');

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (novels === undefined) return <div><CircularProgress color="inherit" /></div>;

    var novel = null;

    if(!init && data.mode == "Edit"){
        novel = novels.filter( novel => novel.id == data.id)[0];

        setNovelName(novel.name);
        setNovelURL(novel.url);
        setNovelLatestChapter(novel.latest_chapter);
        setNovelCompleted(novel.completed);
        setNovelNote(novel.note);
        setInit(true);
    }

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

    const handleNovelNameInput = (e) => {
        setNovelName(e.target.value);
    }

    const handleNovelNovelInput = (e) => {
        setNovelURL(e.target.value);
    }

    const handleNovelLatestChapterInput = (e) => {
        setNovelLatestChapter(e.target.value);
    }

    const handleCompletedInput = (e) => {
        setNovelCompleted(JSON.parse(e.target.value));
    }

    const handleNoteInput = (e) => {
        setNovelNote(e.target.value);
    }

    const handleCancel = (e) => {
        if (data.mode == "Create") {
            window.location.href = "/create-record";
        } else if (data.mode == "Edit") {
            window.location.href = "/view-records";
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        var newNovelRecords = [];
        var novelId = 0;

        const novelRecord = {
            "name": novelName,
            "url": novelURL,
            "latest_chapter": novelLatestChapter,
            "completed": novelCompleted,
            "note": novelNote,
            "updated_at": Date.now()
        }

        if (data.mode == "Create") {
            if (novels) {
                const sortedNovelRecords = novels.sort((a, b) => b.id - a.id);
                novelId = sortedNovelRecords[0].id + 1;
            }

            novelRecord["id"] = novelId;
            novelRecord["created_at"] = Date.now();

            if (novels != null) {
                newNovelRecords = novels;
                newNovelRecords.push(novelRecord);
            } else {
                newNovelRecords = [novelRecord];
            }
        } else if (data.mode == "Edit") {
            newNovelRecords = novels.filter( novel => novel.id != data.id);
            novel = novels.filter( novel => novel.id == data.id)[0];

            novelRecord["id"] = data.id;
            novelRecord["created_at"] = novel.created_at;
    
            newNovelRecords.push(novelRecord);
        }

        update({
            "novels": newNovelRecords
        });

        window.location.href = "/view-records";
    }

    return (
        <div className='novel-form'>
            <div className="title">{data.mode} Record</div>
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit}>
                    <div className='novel-form-input'>
                        <TextField
                            fullWidth
                            id="novel-name"
                            label="Novel Name"
                            variant="outlined"
                            color="white"
                            value={novelName}
                            onChange={handleNovelNameInput} />
                    </div>
                    <div className='novel-form-input'>
                        <TextField
                            fullWidth
                            id="novel-link"
                            label="Novel Link"
                            variant="outlined"
                            color="white"
                            value={novelURL}
                            onChange={handleNovelNovelInput} />
                    </div>
                    <div className='novel-form-input'>
                        <TextField
                            fullWidth
                            id="latest-chapter"
                            label="The Latest Chapter You Read"
                            variant="outlined"
                            color="white"
                            value={novelLatestChapter}
                            onChange={handleNovelLatestChapterInput} />
                    </div>
                    <div className='novel-form-input'>
                        <FormControl fullWidth>
                            <FormLabel className="form-label" id="completed" color="white">Completed?</FormLabel>
                            <RadioGroup
                                row
                                name="completed"
                                onChange={handleCompletedInput}
                                value={novelCompleted ? "true" : "false"}
                            >
                                <FormControlLabel className="form-control-label" value="true" control={<Radio color="white" />} label="Yes" />
                                <FormControlLabel className="form-control-label" value="false" control={<Radio color="white" />} label="Not yet" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='novel-form-input'>
                        <TextField
                            id="note"
                            label="Note"
                            color="white"
                            multiline
                            fullWidth
                            rows={4}
                            onChange={handleNoteInput}
                            value={novelNote}
                        />
                    </div>
                    <div className='novel-form-submit'>
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

export default RecordNovelForm;
