import { useEffect, useState } from 'react';
import Portfolio from "./Portfolio";
import { compClasses } from "./components-classes";
import ReactGA from 'react-ga4';

export default function MainRightContainer() {
  const [hasScrolled50, setHasScrolled50] = useState(false);

  useEffect(() => {
    const handleScroll = () => {

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

      if (scrollPercentage >= 50 && !hasScrolled50) {
        ReactGA.event('scroll_portfolio', {
          category: 'scroll',
          action: 'scroll_portfolio',
          label: 'Scrolled 50% down',
        });

        setHasScrolled50(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="main-right-container" className={compClasses.mainRightContainer.mainContainer}>
      <Portfolio isNested={true} />
    </div>
  );
}
