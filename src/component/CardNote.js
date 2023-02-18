import Button from '@mui/material/Button';
import './RecordView.css'
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import Typography from '@mui/material/Typography';



function CardNote(data) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);

    const handleClickNote = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='card-note'>
            {data.note ?
                <div>
                    <Button size="small" color="blue" className='card-btn' onClick={handleClickNote}>Show Note</Button>

                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Typography className='card-note-text'>{data.note}</Typography>
                    </Popover>
                </div>
                :
                <div></div>
            }
        </div>
    );
}

export default CardNote;
