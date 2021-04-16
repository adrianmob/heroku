import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { useStyles } from "../../../hooks/useStyle"

export const AlertaConfirmacion = ({ openC, handleCloseC, messageC, emojiC, textButton, handleAcceptC }) => {
    const classes = useStyles();

    return (
        <Dialog open={openC} onClose={handleCloseC}>
            <DialogContent className="alertaContainerConfirm">
                <span className="emoji">{emojiC}</span>
                {messageC}
                <span className="emoji">{emojiC}</span>
            </DialogContent>
            <DialogContent className="alertaContainerConfirm">
                <Button
                    variant="contained"
                    type="button"
                    style={{
                        width: "40%"
                    }}
                    className={classes.primary}
                    onClick={handleCloseC}
                >
                    Cancelar
                </Button>
                &nbsp;&nbsp;
                <Button
                    variant="contained"
                    style={{
                        width: "40%",
                        background: "#FFFFFF",
                        borderRight: "2px solid #FCBB13",
                        borderLeft: "2px solid #FCBB13",
                        borderBottom: "2px solid #FCBB13",
                        borderTop: "2px solid #FCBB13"
                    }}
                    className={classes.primary}
                    onClick={handleAcceptC}
                >
                   <span 
                        style={{
                            color: 'black'
                        }}
                    >{ textButton }</span>
                </Button>
            </DialogContent>
        </Dialog>
    )
}