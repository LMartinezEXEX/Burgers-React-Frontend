import '../assets/css/Footer.css';

const Footer = (props) => {

    return (
        <div className="footer-container">
            <div className="left-side">
                <p>Developed by <a target='_blank' href="https://www.linkedin.com/in/lautaromartinezcs/">Lautaro Martinez</a></p>
            </div>
            <div className="right-side">
                <p>More proyects? Check my <a target='_blank' href='https://github.com/LMartinezEXEX'>github!</a></p>
            </div>
        </div>
    );
};

export default Footer;