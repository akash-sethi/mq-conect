# Global





* * *

## Class: MQCD
MQCommonData is a constructor function that provides properties to set common data for MQ Rest API,
and also expose method to fetch options for Put/Get.

**apiBase**:  , All operation starts with this common base path.
**username**:  , auth username.
**password**:  , auth password.
**message**:  , valid formatted message as string
**hostname**:  , hostname without http/https.
**port**:  , mq port
**qmgrName**:  , mq queue manager name
**requestQ**:  , mq request queue
**expired**:  , The maximum time to keep message on queue, default 10 seconds
**getOptionsPut**:  , This instance method returns mq options for put request.
**getOptionsReply**:  , This instance method returns mq options for reply.


* * *










