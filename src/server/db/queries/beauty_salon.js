const knex = require('../connection');

//------------------SELECT *-----------------------

function getPosition() {
	return knex.select().from('position');
}

function getAllMasters() {
	return knex.select().from('master');
}

function getGroups() {
	return knex.select().from('group');
}

//+
function getServices_Group() {
	return knex.select().from('service');
}

//+
function getServices() {
	return knex.select('service.id', 'service.service', 'group.group').join('group', 'service.id_group', 'group.id').from('service');
}

function getServiceGroup() {
	return knex.select('service.service', 'group.group', 'service.price').join('group', 'service.id_group', 'group.id').from('service');
}

//+
function getReviews() {
	return knex.select('profile.name', 'profile.photo', 'review.review').join('profile', 'client.id_profile', 'profile.id').join('review', 'client.id', 'review.id_client').from('client');
}

function getUsers() {
	return knex.select(). from('user');

}

function getMasters(id_group){
	return knex.select('master.id', 'master.name', 'master.surname').from('master').join('position', 'master.id_position', 'position.id').where({ 'position.id_group': parseInt(id_group) });
}

function getRecordsByClient(id_client){
	return knex.select('service.service', 'service.price', 'schedule.date', 'schedule.time').from('record').join('service', 'record.id_service', 'service.id').join('schedule', 'record.id_schedule', 'schedule.id').where({'record.id_client': parseInt(id_client)});
}


//-------------------SELECT--------------------

//+
function getOneService(id) {
	return knex.select().from('service').where({ id: parseInt(id) });
}

function getServiceByGroup(id) {
	return knex.select('service', 'price').from('service').where({ id_group: parseInt(id) });
}

//+
function getIdClient(id) {
	return knex.select('id').from('client').where({ id_user: parseInt(id) });
}

//+
function getOneClient(id) {
	return knex.select('profile.name', 'profile.photo').join('profile', 'client.id_profile', 'profile.id').from('client').where({ 'client.id': parseInt(id) });
}

//+
function checkLogin(login) {
	return knex.select().from('public.user').where({login: String(login)});
}

function getSchedule(schedule) {
	return knex.select().from('schedule').where({id_master: String(schedule.id_master), date: schedule.date});
}





//-----------------INSERT----------------

function addService(service){
	return knex.insert(service).returning('*').into('service');
}

//+
function addReview(review){
	return knex.insert(review).returning('*').into('review');
}

//+
function addUser(user){
	return knex.insert(user).returning('id').into('public.user');
}

//+
function addProfile(profile){
	return knex.insert(profile).returning('id').into('profile');
}

//+
function addClient(client){
	return knex.insert(client).returning('*').into('client');
}

function addMaster(master){
	return knex.insert(master).returning('*').into('master');
}

function addSchedule(schedule){
	return knex.insert(schedule).returning('*').into('schedule');
}

function addRecord(record){
	return knex.insert(record).returning('*').into('record');
}

//----------------UPDATE------------------

function updateService(id, service){
	return knex.update(service).where({ id: parseInt(id) }).returning('*').into('service');
}

//----------------DELETE------------------

function deleteService(id){
	return knex.delete().where({id: parseInt(id)}).returning('*').into('service');
}

module.exports = {
  getPosition,
  getGroups,
  getServices,
  addService,
  getOneService,
  getServiceByGroup,
  updateService,
  deleteService,
  getServiceGroup,
  addReview,
  getReviews,
  getUsers,
  getIdClient,
  getOneClient,
  checkLogin,
  addUser,
  addProfile,
  addClient,
  getServices_Group,
  getMasters,
  addMaster,
  getAllMasters,
  addSchedule,
  getSchedule,
  addRecord,
  getRecordsByClient
};