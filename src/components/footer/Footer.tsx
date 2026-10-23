import { ArrowUpRight } from "lucide-react";
import SocialMedia from "../social-media/SocialMedia";
import { MotionToggle } from "../smooth-scroll/SmoothScroll";
import { SITE_LINKS } from "@/lib/links";

export default function Footer() {
  return (
    <footer id="footer" className="site-footer">
      <div className="footer-invitation">
        <div>
          <a
            className="footer-heading"
            href={SITE_LINKS.email}
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
        <a href={SITE_LINKS.sections.home} className="back-top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
