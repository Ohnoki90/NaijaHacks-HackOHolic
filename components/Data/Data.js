export const  Events = (function(){
  var topics = {};
  var hOP = topics.hasOwnProperty;

  return {
    subscribe: function(topic, listener) {
      // Create the topic's object if not yet created
      console.log(`New subscriber to ${topic}`);
      if(!hOP.call(topics, topic)) topics[topic] = [];

      // Add the listener to queue
      var index = topics[topic].push(listener) -1;

      // Provide handle back for removal of topic
      return {
        remove: function() {
          delete topics[topic][index];
        }
      };
    },
    publish: function(topic, info) {
      try {
        console.log(`Publishing ${topic} with payload ${JSON.stringify(info)}`);
      } catch (e) {
        // probably sending non-serializable data
      }
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if(!hOP.call(topics, topic)) return;

      // Cycle through topics queue, fire!
      topics[topic].forEach(function(item) {
      		item(info != undefined ? info : {});
      });
    }
  };
})();

var listData = [
  {
      Key: '598a678278fee204ee512cd2c',
      name: 'Pringles',
      price: '699.99',
    },
    {
      Key: '598a678278fee204ee512cd2f',
      name: 'Coke',
      price: '99.99',
    },
    {
      Key: '598a678278fee204ee512cd2g',
      name: 'Nivea',
      price: '599.99',
    },
    {
      Key: '598a678278fee204ee512cd2e',
      name: 'Set of Pencils',
      price: '1299.99',
    },
];

export default listData
