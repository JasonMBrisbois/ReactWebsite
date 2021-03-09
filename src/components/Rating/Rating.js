import './Rating.css';
import {useState, useEffect} from 'react';
import Picture from './Picture/Picture';
import * as Tone from 'tone'


export default function Rating(props) {

    const synth = new Tone.Synth().toDestination();
    const array =['C','D','E','F','G','A','B'];

    const [counter, setCounter] = useState(0);

    const [url, setUrl] = useState(undefined);

    const [priorNote, setNote] =useState({'note':'C','octave':4})

    useEffect(()=>{
        updatePicture();
    },[counter]);

    const playTone = (number) => {
            //console.log(priorNote)
            var newOctave = priorNote.octave;
            var newindex = array.indexOf(priorNote.note) + number;

            //console.log(newindex)
            //console.log(newOctave);
            if(newindex > 6) {
                newindex = 0;
                newOctave = priorNote.octave + 1;
            }
            else if(newindex< 0) {
                newindex = 6;
                newOctave = priorNote.octave - 1;
            }
            //console.log(newindex);
            
            if (newOctave > 6) {
                newOctave = 6;
            }
            if (newOctave < 1) {
                newOctave = 1;
            }

            var newNote = { 'note':array[newindex], 'octave':newOctave};
            console.log(newNote);
            setNote(newNote);

            synth.triggerAttackRelease(`${array[newindex]}${newOctave}`, '8n');
    }

    const updatePicture = () => {
        fetch(`https://dog.ceo/api/breed/${props.breed}/images/random`)
        .then(res => res.json())
        .then(data => setUrl(data.message));

    };

    const updateState = (number) => {
        setCounter(counter + number);
        playTone(number);
    };

    return(
        <div>
        <Picture theUrl={url}/>
        <div className="columnit">
            <button onClick={() => updateState(1)}>upvote!</button>
            <p className="space">{counter}</p>
            <button onClick={() => updateState(-1)}> downvote!</button>
        </div>
        </div>
    );
}