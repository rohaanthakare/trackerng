export class GlobalConstants {
    public static COLORS = {
        domain: ['#5BC0BE', '#FFE66D', '#00B4D8', '#E63946', '#F1FAEE', '#81B29A', '#FFBE0B', '#EF476F', '#FAF3DD',
            '#87BBA2', '#4EA8DE', '#FFA69E', '#E4FDE1', '#B4FADC', '#FFFD82', '#70D6FF', '#EE4266', '#C0C0C0',
            '#A1C181', '#FDB833', '#43BCCD']
    };

    public static SINGLE_COLOR = {
        domain: ['#5BC0BE']
    };
    public static MONTHS_MMM = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    public static ADMIN_VIEWS = [{
        viewCode: 'LOAD_MASTER_DATA',
        viewTitle: 'Load Master Data',
        viewType: 'view',
        isMenu: true,
        isToolbar: false,
        iconClass: 'fas fa-upload',
        displayOrder: 1,
        viewRoute: 'home/load-data'
    }];
}

export enum Role {
    ADMIN = 'ADMIN',
    TRACKER_USER = 'TRACKER_USER'
}
