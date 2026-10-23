import { ArrowUpRight } from "lucide-react";
import SocialMedia from "../social-media/SocialMedia";
import { MotionToggle } from "../smooth-scroll/SmoothScroll";

export default function Footer() {
  return (
    <footer id="footer" className="site-footer">
      <div className="footer-invitation">
        <div>
          <a
            className="footer-heading"
            href="mailto:natthawut.klangyod@gmail.com"
          >
            Let’s make it happen.
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <span className="footer-sun" aria-hidden="true" />
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Natthawut Klangyod</p>
        <SocialMedia />
        <MotionToggle />
        <a href="#main-content" className="back-top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
