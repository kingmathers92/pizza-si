import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import "../styles/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <a href="https://www.instagram.com/pizzasitn/">
          <InstagramIcon />
        </a>
        <a href="https://twitter.com/your-twitter-profile" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </a>
        <a href="https://www.facebook.com/PizzaSi/" target="_blank" rel="noopener noreferrer">
          <FacebookIcon />
        </a>
        <a href="mailto:pizzasi.sinatra@gmail.com" target="_blank" rel="noopener noreferrer">
          <EmailIcon />
        </a>
      </div>
      <div className="info">
        <p> &copy; 2023 pizzasi.com</p>
        <LocalPhoneIcon/><p>99 888 044</p>
      </div>
    </div>
  );
}