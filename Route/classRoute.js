const express = require('express');
const classController = require("./../Controller/classController");
const {insertValidations,updateValidations,deleteValidations} = require("../MiddleWares/Validations/ClassValidations")
const {isTeacher,isAdmin,isAuthTeacher,isTeacherOrAdmin,isAuthTeacherOrAdmin} = require('../MiddleWares/AuthMW');
const validator = require('../MiddleWares/Validations/Validator')

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       properties:
 *         _id:
 *            type: number
 *            description: The class id    
 *         fullname:
 *           type: string
 *           description: The class full name
 *         supervisor:
 *           type: string
 *           description: The supervisor id
 *         children:
 *           type: array
 *           description: The class children
 *           items:
 *               type : number
 *               descrition : a child id
 *             
 */


/**
 * @swagger
 * /class:
 *   get:
 *     summary: Returns the list of all the classes
 *     tags : [Classes]
 *     responses:
 *       200:
 *         description: The list of the classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Get the class by id
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The class id
 *     responses:
 *       200:
 *         description: The class data by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: The class id was not found
 */

/**
 * @swagger
 * /class:
 *   post:
 *     summary: add a new class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: The class was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /class:
 *   put:
 *     summary: update class data
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: The class was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The class id was not found
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /class:
 *   delete:
 *     summary: delete a class from the db
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type : object
 *               properties:
 *                    _id:
 *                      type: string
 *                      description : the class id
 *     responses:
 *       200:
 *         description: The class was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The class id was not found
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     summary: Get the class children by class id
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The class id
 *     responses:
 *       200:
 *         description: The class children data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Child'
 *       404:
 *         description: The class id was not found
 */
/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     summary: Get the class supervisor by class id
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The class id
 *     responses:
 *       200:
 *         description: The class supervisor data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: The class id was not found
 */

// Route Intialization //
const router = express.Router();

/* /class route  */
router.route('/class')
        .all(isTeacherOrAdmin)
        .get(classController.getAllClassData)
        .post(insertValidations,validator,classController.addNewClass)
        .put(updateValidations,validator,classController.updateClass)
        .delete(deleteValidations,validator,classController.deleteClass)

/* /class/id route  */
router.get('/class/:id(\\d+)',isTeacherOrAdmin,classController.getClassByID)
/* /class/child/id route  */
router.get('/class/child/:id',isTeacherOrAdmin,classController.getAllClassChildren)
/* /class/teacher/id route  */
router.get('/class/teacher/:id',isAdmin,classController.getClassTeacher)


module.exports=router;
