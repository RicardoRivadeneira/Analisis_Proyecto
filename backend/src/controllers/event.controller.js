// backend/src/controllers/event.controller.js
import { EventPostDTO, EventPutDTO } from "../dto/event.dto.js";
import { ResponseModel } from "../models/response.model.js";
import { EventService } from "../services/event.service.js";
import { RequestValidator } from "../validators/request.validator.js";
import { eventEmitter } from "../utils/event_emitter.js";

export class EventController {

    /**
     * 
     * @param {import("express").Request} request 
     * @param {import("express").Response<ResponseModel, Record<string, any>>} response 
     */
    static getEvents = async (request, response) => {
        const responseModel = new ResponseModel()

        try {
            responseModel.data = await EventService.getEvents()
            responseModel.response = true
        } catch (error) {
            responseModel.error = error.message
        } finally {
            response.send(responseModel)
        }
    }

    /**
     * 
     * @param {import("express").Request} request 
     * @param {import("express").Response<ResponseModel, Record<string, any>>} response 
     */
    static getEventsOfUser = async (request, response) => {
        const responseModel = new ResponseModel()
        const { userId } = request.params

        try {
            responseModel.data = await EventService.getEventsOfUser(userId)
            responseModel.response = true
        } catch (error) {
            responseModel.error = error.message
        } finally {
            response.send(responseModel)
        }
    }

    /**
     * 
     * @param {import("express").Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>} request 
     * @param {import("express").Response<ResponseModel, Record<string, any>>} response 
     */
    static getEvent = async (request, response) => {
        const responseModel = new ResponseModel()
        const { id } = request.params

        try {
            responseModel.data = await EventService.getEvent(id)
            responseModel.response = true
        } catch (error) {
            responseModel.error = error.message
        } finally {
            response.send(responseModel)
        }
    }

    /**
     * 
     * @param {import("express").Request<ParamsDictionary, any, EventPostDTO, QueryString.ParsedQs, Record<string, any>>} request 
     * @param {import("express").Response<ResponseModel, Record<string, any>>} response 
     */
    static postEvent = async (request, response) => {
        const responseModel = new ResponseModel()

        try {
            const eventData = request.body

            if (!RequestValidator.hasSchema(eventData, EventPostDTO))
                throw new Error(`Request body have empty properties or hasn't specified schema: ${Object.keys(new EventPostDTO())}`)

            const newEvent = await EventService.addEvent(eventData)
            responseModel.data = newEvent
            responseModel.response = true

            // Emitir evento de creación de evento
            eventEmitter.emit('eventCreated', newEvent)
        } catch (error) {
            responseModel.error = error.message
        } finally {
            response.send(responseModel)
        }
    }

    /**
     * 
     * @param {import("express").Request<ParamsDictionary, any, EventPutDTO, QueryString.ParsedQs, Record<string, any>>} request 
     * @param {import("express").Response<ResponseModel, Record<string, any>>} response 
     */
    static putEvent = async (request, response) => {
        const responseModel = new ResponseModel()
        const { id } = request.params

        try {
            const eventData = request.body

            if (!RequestValidator.hasSchema(eventData, EventPutDTO))
                throw new Error(`Request body have empty properties or hasn't specified schema: ${Object.keys(new EventPutDTO())}`)

            const updatedEvent = await EventService.updateEvent(id, eventData)
            responseModel.data = updatedEvent
            responseModel.response = true

            // Emitir evento de edición de evento
            eventEmitter.emit('eventUpdated', updatedEvent)
        } catch (error) {
            responseModel.error = error.message
        } finally {
            response.send(responseModel)
        }
    }
}
