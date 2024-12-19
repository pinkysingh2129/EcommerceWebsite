import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue, 
    SelectGroup, 
    SelectLabel 
} from '@radix-ui/react-select';

import { Label } from '@radix-ui/react-label'; 
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {
    function renderInputsByComponentType(getControlItem) {
        const value = formData[getControlItem.name] || '';
        
        switch (getControlItem.ComponentType) {
            case 'input':
                return (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) => 
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value
                            })
                        }
                    />
                );

            case 'select':
                return (
                    <Select 
                        onValueChange={(value) => 
                            setFormData({
                                ...formData,
                                [getControlItem.name]: value
                            })
                        } 
                        value={value}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={getControlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup> 
                                <SelectLabel>{getControlItem.label || 'Choose an option'}</SelectLabel> 
                                {Array.isArray(getControlItem.options) && getControlItem.options.length > 0 
                                    ? getControlItem.options.map(optionItem => (
                                        <SelectItem key={optionItem.id} value={optionItem.id}>
                                            {optionItem.label}
                                        </SelectItem>
                                    ))
                                    : (
                                        <SelectItem disabled value="no-options">
                                            No options available
                                        </SelectItem>
                                    )
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                );

            case 'textarea':
                return (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        value={value}
                    />
                );

            default:        
                return (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        type={getControlItem.type}
                        value={value}
                        onChange={(event) => 
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value
                            })
                        }
                    />
                );
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {formControls.map(controlItem => (
                    <div className="grid w-full gap-1.5" key={controlItem.name}> 
                        <Label className="mb-1">
                            {controlItem.label}
                        </Label>
                        {renderInputsByComponentType(controlItem)}
                    </div>
                ))}
            </div>
            <Button type='submit' className='mt-2 w-full'>
                {buttonText || 'Submit'}
            </Button>
        </form>
    );
}

export default CommonForm;
