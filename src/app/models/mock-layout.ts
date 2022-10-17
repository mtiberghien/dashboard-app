import { Layout } from "./layout";

export const mock_layout: Layout={
    rows:
    [
        {
            cells:[
                {
                    content:'Cell 1'
                },
                {
                    grow: 0.5,
                    content:'Cell 2'
                },
                {
                    content:'Cell 3'
                },
                {
                    content:'Cell 4'
                }
            ]
        },
        {
            grow:2,
            cells:[
                {
                    content:'Cell 5'
                },
                {
                    content:'Cell 6'
                }
            ]
        },
        {
            cells:[
                {
                    content:'Cell 7'
                },
                {
                    content:'Cell 8'
                },
                {
                    content:'Cell 9'
                }
            ]
        }
    ]
    }