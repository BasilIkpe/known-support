import { useMemo, useState } from 'react'
import { supabase } from './supabase.js'
import knownLogo from './assets/known-logo-gold.png'
import knownTree from './assets/known-tree-gold.jpeg'
import bookCover from './assets/before-the-ground-forgets-cover.png'

const whatsappNumber = '2348083999413'

const supportOptions = [
  ['Financial sponsorship', 'Financial Support', 'Contribute to one or more summit needs.'],
  ['Introduce a sponsor or funder', 'Open a Door', 'Connect Team KNOWN with a funder, CSR team or foundation.'],
  ['Venue support or venue introduction', 'Venue Support', 'Provide, recommend or introduce us to a suitable Lagos venue.'],
  ['Audio, lighting and stage production', 'Production Support', 'Provide or connect us with audio, lighting and stage services.'],
  ['Speaker and guest hospitality', 'Guest Hospitality', 'Support accommodation or connect us with a hotel partner.'],
  ['Transportation and logistics', 'Transport & Logistics', 'Provide services or introduce a logistics partner.'],
  ['Event branding and signage', 'Branding & Signage', 'Support fabrication, signage or event-environment design.'],
  ['Media partnership', 'Media Partnership', 'Offer coverage, interviews, broadcast or content collaboration.'],
  ['Professional expertise or volunteering', 'Expertise', 'Contribute professional knowledge or specialised support.'],
  ['Organisation partnership', 'Organisation Partnership', 'Represent a university, company, NGO, agency or professional body.'],
  ['Products or in-kind services', 'Products or Services', 'Provide useful items, equipment or professional services.'],
  ['Other form of support', 'Other', 'Tell us another way you would like to help.'],
]

const initialForm = {
  supporterKind: 'individual',
  selected: [],
  name: '',
  organisation: '',
  role: '',
  contact: '',
  message: '',
  consentToContact: true,
  consentToPublicName: false,
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [reference, setReference] = useState('')

  const buttonText = useMemo(() => {
    if (submitting) return 'Preserving your support request…'
    return 'Submit Support Request'
  }, [submitting])

  function updateField(event) {
    const { name, value, type, checked } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function toggleSupport(value) {
    setForm((current) => ({
      ...current,
      selected: current.selected.includes(value)
        ? current.selected.filter((item) => item !== value)
        : [...current.selected, value],
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setReference('')

    if (!form.selected.length) {
      setError('Please select at least one way you would like to help.')
      return
    }

    if (!form.name.trim() || !form.contact.trim()) {
      setError('Please enter your full name and phone number or email address.')
      return
    }

    if (form.supporterKind === 'organisation_representative' && !form.organisation.trim()) {
      setError('Please enter the organisation you represent.')
      return
    }

    setSubmitting(true)

    try {
      const { data, error: rpcError } = await supabase.rpc('submit_support_request', {
        p_full_name: form.name.trim(),
        p_organisation: form.organisation.trim() || null,
        p_role_title: form.role.trim() || null,
        p_contact: form.contact.trim(),
        p_support_types: form.selected,
        p_message: form.message.trim() || null,
        p_supporter_kind: form.supporterKind,
        p_consent_to_contact: form.consentToContact,
        p_consent_to_public_name: form.consentToPublicName,
      })

      if (rpcError) throw rpcError

      const result = Array.isArray(data) ? data[0] : data
      const supportReference = result?.support_reference

      if (!supportReference) {
        throw new Error('The request was saved, but no support reference was returned.')
      }

      setReference(supportReference)

      const selectedLines = form.selected.map((item) => `• ${item}`)
      const message = [
        'Hello Team KNOWN,',
        '',
        `My support reference is ${supportReference}.`,
        '',
        'I would like to support the KNOWN Experience Summit — Before the Ground Forgets.',
        '',
        'HOW I CAN HELP:',
        ...selectedLines,
        '',
        'MY DETAILS:',
        `Name: ${form.name.trim()}`,
        `Supporter type: ${form.supporterKind === 'individual' ? 'Private individual' : 'Organisation representative'}`,
        `Organisation: ${form.organisation.trim() || 'Not provided'}`,
        `Role: ${form.role.trim() || 'Not provided'}`,
        `Contact: ${form.contact.trim()}`,
        '',
        'Additional note:',
        form.message.trim() || 'None',
        '',
        'Please contact me for further engagement.',
      ].join('\n')

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      setForm(initialForm)
    } catch (submissionError) {
      console.error(submissionError)
      setError(submissionError.message || 'We could not save your request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="KNOWN home">
          <img src={knownLogo} alt="KNOWN gold tree logo" />
          <span>
            <strong>KNOWN</strong>
            <small>Experience Summit</small>
          </span>
        </a>
        <a className="topbar-link" href="#support">Support the movement</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Lagos · November 2026</p>
            <h1>Before the Ground Forgets</h1>
            <p className="hero-deck">A summit born from a novel, deepened through a reflective card game, and carried forward as a movement for memory, identity and meaningful conversation.</p>
            <div className="hero-actions">
              <a className="primary-action" href="#support">Become part of the legacy</a>
              <a className="secondary-action" href="#story">Discover the story</a>
            </div>
            <p className="signature-line">Some conversations deserve to become legacies.</p>
          </div>

          <div className="hero-art" aria-label="Before the Ground Forgets book cover">
            <div className="book-glow" />
            <img src={bookCover} alt="Front, spine and back cover of Before the Ground Forgets" />
          </div>
        </section>

        <section className="story-panel" id="story">
          <div className="story-mark">
            <img src={knownTree} alt="KNOWN tree emblem" />
          </div>
          <div className="story-copy">
            <p className="eyebrow">One story. One hundred and eight questions.</p>
            <h2>A platform rooted in remembrance</h2>
            <p><em>Before the Ground Forgets</em> and the KNOWN reflective card game form one experience: a story to enter, questions to carry, and conversations that help people become more fully seen.</p>
            <p>The summit extends that experience into a living room of ideas—bringing together individuals, institutions and partners who believe that what matters should not be forgotten.</p>
          </div>
          <blockquote>
            <span>“</span>
            What remains is never lost.
          </blockquote>
        </section>

        <section className="support-section" id="support">
          <div className="support-intro">
            <p className="eyebrow">Legacy Invitation</p>
            <h2>Help us unlock what the summit needs</h2>
            <p>You do not have to fund the summit yourself to make a meaningful contribution. Sometimes an introduction is enough. You can help through resources, services, expertise, partnerships or financial support.</p>
          </div>

          <form className="support-form" onSubmit={handleSubmit}>
            <div className="form-banner">
              <img src={knownLogo} alt="" aria-hidden="true" />
              <div>
                <p>KNOWN Support Portal</p>
                <span>Every commitment is recorded. Every verified contribution becomes part of the movement’s shared story.</span>
              </div>
            </div>

            <fieldset>
              <legend>Who are you supporting as?</legend>
              <div className="supporter-kind" role="radiogroup" aria-label="Supporter type">
                <label className={form.supporterKind === 'individual' ? 'selected-card' : ''}>
                  <input type="radio" name="supporterKind" value="individual" checked={form.supporterKind === 'individual'} onChange={updateField} />
                  <span><b>Private Individual</b><small>I am supporting personally.</small></span>
                </label>
                <label className={form.supporterKind === 'organisation_representative' ? 'selected-card' : ''}>
                  <input type="radio" name="supporterKind" value="organisation_representative" checked={form.supporterKind === 'organisation_representative'} onChange={updateField} />
                  <span><b>Organisation Representative</b><small>I represent a company, institution, NGO, agency or other organisation.</small></span>
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>How would you like to help?</legend>
              <div className="options">
                {supportOptions.map(([value, title, description]) => (
                  <label className={`option ${form.selected.includes(value) ? 'selected-card' : ''}`} key={value}>
                    <input type="checkbox" checked={form.selected.includes(value)} onChange={() => toggleSupport(value)} />
                    <span><b>{title}</b><small>{description}</small></span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Tell us about you</legend>
              <div className="fields">
                <label><span>Full name</span><input name="name" value={form.name} onChange={updateField} type="text" placeholder="Your full name" required /></label>
                <label><span>Organisation</span><input name="organisation" value={form.organisation} onChange={updateField} type="text" placeholder={form.supporterKind === 'organisation_representative' ? 'Organisation name' : 'Optional'} /></label>
                <label><span>Role or title</span><input name="role" value={form.role} onChange={updateField} type="text" placeholder="Optional" /></label>
                <label><span>Phone or email</span><input name="contact" value={form.contact} onChange={updateField} type="text" placeholder="How should we reach you?" required /></label>
              </div>
              <label className="message-field"><span>Note, recommendation or introduction</span><textarea name="message" value={form.message} onChange={updateField} placeholder="Tell Team KNOWN how you would like to help…" /></label>
            </fieldset>

            <div className="consents">
              <label><input type="checkbox" name="consentToContact" checked={form.consentToContact} onChange={updateField} /> Team KNOWN may contact me about this support request.</label>
              <label><input type="checkbox" name="consentToPublicName" checked={form.consentToPublicName} onChange={updateField} /> My name may be acknowledged publicly after verification.</label>
            </div>

            {error && <div className="message error" role="alert">{error}</div>}
            {reference && <div className="message success" role="status">Thank you. Your support reference is <strong>{reference}</strong>. WhatsApp has been opened with your details.</div>}

            <button className="submit-button" type="submit" disabled={submitting}>{buttonText}</button>
            <p className="note">Your request is saved securely before WhatsApp opens.</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <img src={knownTree} alt="" aria-hidden="true" />
        <p><strong>Perhaps your greatest contribution will be the door you open.</strong><br />Every partnership begins with a conversation.</p>
        <span>KNOWN Experience Summit · Lagos · November 2026</span>
      </footer>
    </div>
  )
}

export default App
