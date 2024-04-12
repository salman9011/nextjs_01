
'use client'
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SuccessPage() {
  const router = useRouter();
  const message = router.query ? router.query.message : '';

  return (
    <div>
      <h1>Operation Successful</h1>
      <p>{message}</p>
       <Button variant="danger" onClick={()=>router.push('/')}>Home</Button>
    </div>
   
  );
}
