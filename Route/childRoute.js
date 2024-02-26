const express = require('express');
const childController = require("./../Controller/childController");
const {insertValidations,updateValidations,deleteValidations} = require("../MiddleWares/Validations/ChildValidations")
const {isTeacher,isAdmin,isAuthTeacher,isTeacherOrAdmin,isAuthTeacherOrAdmin} = require('../MiddleWares/AuthMW');
const validator = require('../MiddleWares/Validations/Validator')

/**
 * @swagger
 * components:
 *   schemas:
 *     Child:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           description: The child id
 *         fullname:
 *           type: string
 *           description: The child full name
 *         age:
 *           type: number
 *           description: The child age
 *         level:
 *           type: string
 *           description: The child level 
 *         address:
 *           type: object
 *           description: The child address
 *           properties:
 *              city:
 *                  type: string
 *                  description: the addrees city
 *              street:
 *                  type: string
 *                  description: the addrees street
 *              building:
 *                  type: string
 *                  description: the addrees building
 *             
 */


/**
 * @swagger
 * /child:
 *   get:
 *     summary: Returns the list of all the children
 *     tags : [Children]
 *     responses:
 *       200:
 *         description: The list of the children
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Child'
 */

/**
 * @swagger
 * /child/{id}:
 *   get:
 *     summary: Get the child by id
 *     tags: [Children]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The child id
 *     responses:
 *       200:
 *         description: The child data by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       404:
 *         description: The child id was not found
 */

/**
 * @swagger
 * /child:
 *   post:
 *     summary: add a new child
 *     tags: [Children]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                fullname:
 *                  type: string
 *                  description: The child full name
 *                age:
 *                  type: number
 *                  description: The child age
 *                level:
 *                  type: string
 *                  description: The child level 
 *                address:
 *                   type: object
 *                   description: The child address
 *                   properties:
 *                       city:
 *                         type: string
 *                         description: the addrees city
 *                       street:
 *                          type: string
 *                          description: the addrees street
 *                       building:
 *                          type: string
 *                          description: the addrees building
 *     responses:
 *       201:
 *         description: The Child was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /child:
 *   put:
 *     summary: update child data
 *     tags: [Children]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       201:
 *         description: The child was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The child id was not found
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /child:
 *   delete:
 *     summary: delete a child from the db
 *     tags: [Children]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type : object
 *               properties:
 *                    _id:
 *                      type: string
 *                      description : the child id
 *     responses:
 *       200:
 *         description: The child was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The child id was not found
 *       500:
 *         description: internal server error
 */
// Route Intialization //
const router = express.Router();

/* /child route  */
router.route('/child')
        .all(isTeacherOrAdmin)
        .get(childController.getAllChildrensData)
        .post(insertValidations,validator,childController.addNewChild)
        .put(updateValidations,validator,childController.updateChild)
        .delete(deleteValidations,validator,childController.deleteChild)

/* /child/id route  */
router.get('/child/:id',isTeacherOrAdmin,childController.getChildByID)

module.exports=router;
