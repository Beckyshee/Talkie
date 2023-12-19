

export interface mail_config{
    host:string,
    port:number,
    service:string,
    requireTLS:boolean,
    auth:{
        user:string,
        pass:string
        
    },
    tls?: {
        rejectUnauthorized?: boolean;
      };
    
} 