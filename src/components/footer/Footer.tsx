import SocialMedia from "../social-media/SocialMedia";

const Footer = () => {
  return (
    <div
      id="footer"
      className="my-20 flex flex-col items-center justify-center gap-y-6 text-balance text-center"
    >
      <h1 className="text-base text-gray-600">
        © 2024 Natthawut Klangyod. All Rights Reserved.
      </h1>
      <SocialMedia />
    </div>
  );
};

export default Footer;
