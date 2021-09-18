import moment from 'moment';

export default [
  {
    title: {
      content: 'Event One Title',
    },
    description: {
      content: 'Event One Description',
    },
    time: {
      content: moment('2021-03-05').format('dddd'), // Wed, Jan 4, 2017
    },
  },
  {
    title: {
      content: 'Event Two Title',
    },
    description: {
      content: 'Event Two Description',
    },
    time: {
      content: moment('2021-03-09T14:21:21.273Z').format('ll'),
    },
  },
  {
    title: {
      content: 'Event Three Title',
    },
    description: {
      content: 'Event Three Description',
    },
    time: {
      content: moment('2021-03-12T14:21:21.273Z').format('ll'),
    },
    icon: {
      content: 'pencil',
    },
  },
  {
    title: {
      content: 'Event Four Title',
    },
    description: {
      content: 'Event Four Description',
    },
    time: {
      content: moment('2021-03-05T14:21:21.273Z').format('ll'),
    },
    icon: {
      content: 'user',
    },
  },
  {
    title: {
      content: 'Event Five Title',
    },
    description: {
      content: 'Event Five Description',
    },
    time: {
      content: moment().format('ll'),
    },
  },
  {
    title: {
      content: 'Event Six Title',
    },
    description: {
      content: 'Event Six Description',
    },
    time: {
      content: moment().format('ll'),
    },
  },
  {
    title: {
      content: 'Event Seven Title',
    },
    description: {
      content: 'Event Seven Description',
    },
    time: {
      content: moment().format('ll'),
    },
    icon: {
      content: 'check',
    },
  },
];
