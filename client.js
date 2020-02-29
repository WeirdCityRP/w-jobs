setImmediate(() => {
    emit('chat:addSuggestion', '/setjob', '', [{name: 'Player ID'}, {name: 'Job', help: 'Jobs: EMS, PDM, SASP'}]);
});