import React, { useState } from 'react';
import { Form, Dropdown, Message, Container, Header, Image, Divider, Loader } from 'semantic-ui-react';
import humanizeDuration from 'humanize-duration';
import 'semantic-ui-css/semantic.min.css';

const handleSelect = (setState) => (e, data) => {
  setState(data.value);
};

const useField = (initialValue, transform) => {
  const [state, setState] = useState(initialValue);
  return [state, transform(setState)];
}

const useSelectField = (initialValue) => {
  return useField(initialValue, handleSelect);
}

function App() {
  const [timeUsefulness, setTimeUsefulness] = useSelectField();
  const [taskFrequency, setTaskFrequency] = useSelectField();
  const [taskDuration, setTaskDuration] = useSelectField();

  const timeUsefulnessOptions = [
    { text: '6 months', value: 0.5 },
    { text: '1 year', value: 1 },
    { text: '2 years', value: 2 },
    { text: '3 years', value: 3 },
    { text: '4 years', value: 4 },
    { text: '5 years', value: 5 }
  ];
  const taskFrequencyOptions = [
    { text: '50 times a day', value: 50 * 365 },
    { text: '10 times a day', value: 10 * 365 },
    { text: '5 times a day', value: 5 * 365 },
    { text: 'daily', value: 365 },
    { text: 'weekly', value: 52 },
    { text: 'monthly', value: 12 },
    { text: 'yearly', value: 1 },
  ];
  const taskDurationOptions = [
    { text: '1 second', value: 1 },
    { text: '5 second', value: 5 },
    { text: '30 seconds', value: 30 },
    { text: '1 minute', value: 60 },
    { text: '5 minutes', value: 5 * 60 },
    { text: '30 minutes', value: 30 * 60 },
    { text: '1 hour', value: 3600 },
    { text: '6 hour', value: 6 * 3600 }
  ];

  const time = taskDuration * taskFrequency * timeUsefulness;
  return (
    <Container>
      <Header as="h1">Is It Worth the Time (of your favorite developer :P)?</Header>
      <Header as="h3">This form will tell you how long you can work on automating a routine task more efficient before you're spending more time than you save.</Header>
      <Form>
        <Form.Field>
          <label>How long this task will be useful?</label>
          <Dropdown
            selection
            fluid
            placeholder="Pick time of usefulness"
            options={timeUsefulnessOptions}
            value={timeUsefulness}
            onChange={setTimeUsefulness}
          />
        </Form.Field>
        <Form.Field>
          <label>How often do you do the task?</label>
          <Dropdown
            selection
            fluid
            placeholder="Pick task frequency"
            options={taskFrequencyOptions}
            value={taskFrequency}
            onChange={setTaskFrequency}
          />
        </Form.Field>
        <Form.Field>
          <label>How much time this task takes you?</label>
          <Dropdown
            selection
            fluid
            placeholder="Pick task duration"
            options={taskDurationOptions}
            value={taskDuration}
            onChange={setTaskDuration}
          />
        </Form.Field>
        {time ?
          (
            <Message positive>
              <Message.Header>You have {humanizeDuration(time * 1000)} to automate this task more time is not worth it!</Message.Header>
            </Message>
          )
          : <Loader active inline='centered'>Fill in the form to get an anwser!</Loader>
        }
      </Form>
      <Divider/>
      <Header as="h3">Interactive version of the famous comic from <a href="https://xkcd.com/1205/">xkcd</a> :D</Header>
      <Image src="https://imgs.xkcd.com/comics/is_it_worth_the_time.png" size="large" centered/>
    </Container>
  );
};

export default App;
