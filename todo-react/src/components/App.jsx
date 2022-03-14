import '../App.css';
import { PrioritySection } from './PrioritySection';

export const TO_DO = 'To Do';
export const DONE = 'Done';

export const Icon = () => {
    return (
        <>
            <svg className="icon" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <line y1="-0.5" x2="18.0096" y2="-0.5" transform="matrix(0.999988 -0.00481873 0.0748716 0.997193 1 10)"
                    stroke="#998899"/>
                <line y1="-0.5" x2="18.0401" y2="-0.5"
                    transform="matrix(-0.0192905 -0.999814 0.998699 0.0509976 10.5404 18.8444)" stroke="#998899"/>
            </svg>
        </>
    );
};

function App() {
    return (
        <div className="todo container App">
            <PrioritySection priority="high"/>
            <PrioritySection priority="low"/>
        </div>
    );
}

export default App;
