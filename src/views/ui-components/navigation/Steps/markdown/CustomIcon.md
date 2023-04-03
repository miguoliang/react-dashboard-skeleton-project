```jsx
import React from 'react'
import { Steps, StepItem, Spinner } from 'components/ui'
import {
  HiOutlineLogin,
  HiOutlineDocumentSearch,
  HiOutlineClipboardCheck,
} from 'react-icons/hi'

const CustomIcon = () => {
  return (
    <div>
      <Steps current={1}>
        <StepItem title="Login" customIcon={<HiOutlineLogin />} />
        <StepItem title="Order Placed" customIcon={<Spinner />} />
        <StepItem
          title="In Review"
          customIcon={<HiOutlineDocumentSearch />}
        />
        <StepItem
          title="Approved"
          customIcon={<HiOutlineClipboardCheck />}
        />
      </Steps>
    </div>
  )
}

export default CustomIcon
```
