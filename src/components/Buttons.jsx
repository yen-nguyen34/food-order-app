function Buttons({textOnly, buttonTxt, onClickCallback}) {
    const cssClasses = textOnly ? "text-button" : "button";
    return <button className={cssClasses} onClick={onClickCallback}>{buttonTxt}</button>;
}

export default Buttons;