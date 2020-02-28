setImmediate(() => {
    emit('chat:addSuggestion', '/setjob', '', [{name: 'Player ID'}, {name: 'Job Name', help: 'Jobs: EMS, PDM, SASP'}]);
});