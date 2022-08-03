import styled from "styled-components";

import mobile from "../../assets/images/mobile.png";

import { ReactComponent as DISCORD } from "../../assets/svgs/social_discord.svg";
import { ReactComponent as TWITTER } from "../../assets/svgs/social_twitter.svg";

const MobileCompatible = () => {
  return (
    <div className="w-full h-full flex justify-center p-[40px] min-h-screen ">
      <div className="max-w-[400px] my-auto">
        <div className="w-full flex justify-center">
          <img src={mobile} className="w-[150px]" alt="" />
        </div>
        <p className="font-black text-[18px] text-center mt-[20px]">
          We are’nt mobile compatible at the moment!
        </p>
        <p className="text-center text-[15px] mt-[10px]">
          We’re still in the early stages of development and are’nt mobile
          compatible at the moment! Visit us via a laptop or desktop device for
          the best experience
          <br />
          <br />
          In the mean time, check out our socials for the latest updates in the
          icons below.
        </p>
        <div className="flex flex-row gap-[20px] justify-center mt-4 mb-[40px]">
          <a
            href="https://twitter.com/PixelWorx_"
            target="_blank"
            rel="noreferrer"
          >
            <SvgWrapper>
              <TWITTER />
            </SvgWrapper>
          </a>

          <a
            href="https://discord.gg/ccevFrdWF8"
            target="_blank"
            rel="noreferrer"
          >
            <SvgWrapper>
              <DISCORD />
            </SvgWrapper>
          </a>
        </div>
      </div>
    </div>
  );
};

const SvgWrapper = styled.div`
  & path {
    fill: ${(props: any) => props.color || "#000"};
  }
`;

export default MobileCompatible;
