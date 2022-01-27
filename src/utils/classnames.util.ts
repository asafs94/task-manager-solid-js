type IClassNamePayload = string | Record<string, boolean>;

function parseClassnameObject(classObject: Record<string, boolean>){
    const entries = Object.entries(classObject);
    return entries.reduce((acc, entry) =>{
        const [className, isActive] = entry;
        if(isActive){
            return acc + ' ' + className;
        }
        return acc;
    }, '')
}

export function cx(...classNames: IClassNamePayload[]): string{
    let baseClassName: string = '';
    for( let className of classNames ){
        if(!className) continue;
        if(typeof className === "string"){
            baseClassName += ` ${className}`;
        } else {
            baseClassName += " " + parseClassnameObject(className);
        }
    }
    return baseClassName.replace(/\s+/g, ' ').trim();
}