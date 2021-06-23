// require dependencies
const router = require('express').Router();
const { Op } = require('sequelize');

// require models
const { CaregiverSchedule, Patient, Appointments, PatientSchedule, Caregiver } = require('../../models');

// get caregiver schedule (available)
router.get('/:id', (req, res) => {    
    CaregiverSchedule.findAll({
        where: {
            caregiver_id: req.params.id
        },
        include: [
            {
                model: Appointments,
                // where: {
                //     appointment_time: {[Op.not]: '10:00:00' }
                // },
                attributes: [
                    'id', 
                    'caregiver_id', 
                    'patient_id', 
                    'appointment_time', 
                    'caregiver_sched_id', 
                    'patient_sched_id'
                ],
                include: [
                    {
                        model: PatientSchedule,
                        attributes: [
                            'id',
                            'patient_id',
                            'date',
                            'start',
                            'end'
                        ],
                        include: [
                            {
                                model: Appointments,
                                attributes: [
                                    'id', 
                                    'caregiver_id', 
                                    'patient_id', 
                                    'appointment_time', 
                                    'caregiver_sched_id', 
                                    'patient_sched_id'
                                ]
                            }
                        ]
                    }
                ]
            }
            
        ]
    }).then(dbCaregiverScheduleData => {
        if (!dbCaregiverScheduleData) {
            res.status(404).json({ message: 'No caregiver schedule data found with that id.' });
            return;
        }
        res.json(dbCaregiverScheduleData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get caregiver schedule (all)
router.get('/:id', (req, res) => {    
    CaregiverSchedule.findAll({
        where: {
            caregiver_id: req.params.id
        },
        include: [
            {
                model: Appointments,
                attributes: [
                    'id', 
                    'caregiver_id', 
                    'patient_id', 
                    'appointment_time', 
                    'caregiver_sched_id', 
                    'patient_sched_id'
                ],
                include: [
                    {
                        model: PatientSchedule,
                        attributes: [
                            'id',
                            'patient_id',
                            'date',
                            'start',
                            'end'
                        ],
                        include: [
                            {
                                model: Appointments,
                                attributes: [
                                    'id', 
                                    'caregiver_id', 
                                    'patient_id', 
                                    'appointment_time', 
                                    'caregiver_sched_id', 
                                    'patient_sched_id'
                                ]
                            }
                        ]
                    }
                ]
            }
            
        ]
    }).then(dbCaregiverScheduleData => {
        if (!dbCaregiverScheduleData) {
            res.status(404).json({ message: 'No caregiver schedule data found with that id.' });
            return;
        }
        res.json(dbCaregiverScheduleData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// export all router routes
module.exports = router;