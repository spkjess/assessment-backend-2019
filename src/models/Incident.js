const mongoose = require('mongoose')

const IncidentSchema = new mongoose.Schema({
  title:     {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  assignee: {
    type:     String,
    required: true
  },
  status:   {
    type: String,
    enum: ['Created', 'Acknowledged', 'Resolved']
  }
}, { timestamps: true })

const Incident = mongoose.model('Incident', IncidentSchema)

module.exports = Incident
