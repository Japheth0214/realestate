import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.error(error);
        setError('Error fetching landlord information');
      } finally {
        setLoading(false);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

const handleSendMessage = async () => {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'user@example.com', // The user's email
        to: landlord.email,
        subject: `Regarding ${listing.name}`,
        body: message,
      }),
    });

    const result = await res.json();

    if (result.success) {
      console.log('Email sent successfully');
      setMessage('');
      alert('Email sent successfully!');
    } else {
      console.error('Failed to send email:', result.message);
      alert('Failed to send email. Please try again.');
    }
  } catch (error) {
    console.error('Error sending email:', error.message);
    alert('An error occurred while sending the email. Please try again.');
  }
};

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span> for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <button
            onClick={handleSendMessage}
            disabled={loading}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message
          </button>
        </div>
      )}
    </>
  );
};

Contact.propTypes = {
  listing: PropTypes.shape({
    userRef: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contact;