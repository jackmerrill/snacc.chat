import Head from "next/head";
import Link from 'next/link';
import Particles from "react-particles-js";
import NotFoundIllustration from "../components/illustrations/404";

export default function NotFound() {
  return (
      <div>
        <Head>
          <title>Error 404 | Snacc</title>
          <meta property={"og:type"} content={"website"}/>
          <meta property={"og:site_name"} content={"Snacc"}/>
          <meta property={"og:url"} content={"https://snacc.chat"}/>
          <meta property={"og:locale"} content={"en-US"}/>
          <meta property={"og:title"} content={"Snacc | Some New Advanced Coder Chat"}/>
          <meta property={"og:description"} content={"An open source social media network for programmers"}/>
          <meta property={"description"} content={"An open source social media network for programmers"}/>
          <meta property={"theme-color"} content={"#1F2937"}/>
        </Head>
        <Particles
          params={{
            "particles": {
              "number": {
                "value": 60,
                "density": {
                  "enable": true,
                  "value_area": 1500
                }
              },
              "line_linked": {
                "enable": true,
                "opacity": 0.02
              },
              "move": {
                "direction": "right",
                "speed": 0.05
              },
              "size": {
                "value": 1
              },
              "opacity": {
                "anim": {
                  "enable": true,
                  "speed": 1,
                  "opacity_min": 0.05
                }
              }
            },
            "interactivity": {
              "events": {
                "onclick": {
                  "enable": true,
                  "mode": "push"
                }
              },
              "modes": {
                "push": {
                  "particles_nb": 1
                }
              }
            },
            "retina_detect": true
          }} className="bg-gray-900 h-screen w-screen overlay"/>
        <div className="flex min-h-screen flex-col items-center justify-center text-center overlay">
          <div className="m-auto z-10 glitchContainer">
              <h1 className="text-8xl font-extrabold text-white mb-3 glitch" data-text="ERROR 404">ERROR 404</h1>
            <div className="lg:inline-block flex justify-center my-4">
              <NotFoundIllustration height="300px" width="100%"/>
            </div>
              <h2 className="hidden md:block text-5xl text-white font-extrabold" data-text="What you are looking for is not here.">What you are looking for is not here.</h2>
          </div>

          <footer className="align-text-middle justify-items-center m-7">
            <Link href="/" passHref>
              <a className="font-extrabold text-gray-500">Why are you still here?</a>
            </Link>
          </footer>
        </div>




      </div>

  );
}
