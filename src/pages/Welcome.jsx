import { Icon } from '@iconify/react';

const Welcome = () => {
  return (
    <div className="bottom-container">
      <div className="welcome-box">
        <div>
          <h3>Search something to get the Weather Data</h3>
        </div>
        <div className="icons" >
        <Icon icon="fluent-emoji:sun-behind-large-cloud" color="gray" width="200" height="200" />
        <Icon icon="fluent-emoji:cloud-with-lightning-and-rain" color="gray" width="200" height="200" />
        <Icon icon="fluent-emoji:cloud-with-snow" color="gray" width="200" height="200" />
        <Icon icon="fluent-emoji:sun-behind-rain-cloud" color="gray" width="200" height="200" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
